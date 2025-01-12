import express from "express";
import colors from "colors";
import cors, { type CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI, { setup } from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

//* Connect to the database
export async function concectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.info(colors.blue("Database connected successfully."));
  } catch (error) {
    console.error(colors.bgRed.white(`Error connecting to the database`));
  }
}
concectDB();

const server = express(); //* Create a new express application

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS from ${origin}`));
    }
  },
};

server.use(cors(corsOptions)); //* Enable CORS

server.use(express.json()); //* Parse request body as JSON

server.use(morgan("dev")); //* Log requests to console

server.use("/api/products", router); //* Use the router in the server

server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //* Use the swagger documentation

export default server;
