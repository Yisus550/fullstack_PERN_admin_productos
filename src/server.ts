import express from "express";
import colors from "colors";
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

server.use(express.json()); //* Parse the request body as JSON

server.use("/api/products", router); //* Use the router in the server

server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //* Use the swagger documentation

export default server;
