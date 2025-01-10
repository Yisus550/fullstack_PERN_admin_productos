import db from "../config/db";
import { concectDB } from "../server";

//* Forzando errores para verificar lineas de un catch (trycatch)
jest.mock("../config/db");

describe("connectDB", () => {
  it("Should handle database connecting error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Error connecting to the database"));
    const consoleSpy = jest.spyOn(console, "error");

    await concectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error connecting to the database")
    );
  });
});