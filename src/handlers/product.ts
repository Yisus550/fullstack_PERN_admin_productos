import type { Request, Response } from "express";
import colors from "colors";
import Products from "../models/Products.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }, //* Can add parameters, like where, limit, etc.
    });
    res.json({ data: products });
  } catch (error) {
    console.log(colors.red(error));
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);

    if (!product) {
      res.status(404).json({ msg: "Producto no encontrado." });
      return;
    }

    res.json({ data: product });
  } catch (error) {
    console.log(colors.red(error));
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Products.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(colors.red(error));
  }
};
