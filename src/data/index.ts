import { exit } from "node:process";
import db from "../config/db";
import colors from "colors";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log(colors.green("Database cleared"));
  } catch (error) {
    console.log(colors.red(error));
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}
