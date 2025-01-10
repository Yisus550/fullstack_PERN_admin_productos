import type { Request, Response } from "express";
import colors from "colors";
import Products from "../models/Products.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Products.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }, //* Can add parameters, like where, limit, etc.
  });
  res.json({ data: products });
};

export const getProductByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);

  if (!product) {
    res.status(404).json({ msg: "Producto no encontrado." });
    return;
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Products.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);

  if (!product) {
    res.status(404).json({ msg: "Producto no encontrado." });
    return;
  }

  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);

  if (!product) {
    res.status(404).json({ msg: "Producto no encontrado." });
    return;
  }

  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Products.findByPk(id);

  if (!product) {
    res.status(404).json({ msg: "Producto no encontrado." });
    return;
  }

  await product.destroy();
  res.json({ msg: "Producto eliminado." });
};
