import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

//* Connect to the database
export async function concectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.info(colors.blue("Database connected successfully."));
  } catch (error) {
    console.error(colors.bgRed.white(`Error connecting to the database: ${error}`));
  }
}
concectDB();

const server = express(); //* Create a new express application

server.use(express.json()); //* Parse the request body as JSON

server.use("/api/productos", router); //* Use the router in the server

export default server;
