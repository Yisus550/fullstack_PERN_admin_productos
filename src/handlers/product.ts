import type { Request, Response } from "express";
import Products from "../models/Products.model";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Products.create(req.body);

  res.json({data: product});
};
