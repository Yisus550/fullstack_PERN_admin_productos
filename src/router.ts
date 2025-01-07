import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProductByID,
  getProducts,
  updateAvailability,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router(); //* Create a new router

//* Define a route handler for the default home page
router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  getProductByID
);

router.post(
  "/",
  //* Validate the request body
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El valor debe ser numerico")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  //* Validate the request body
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El valor debe ser numerico")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor a 0"),
  body("availability")
    .isBoolean()
    .withMessage("La disponibilidad debe ser booleana"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("El id debe ser numerico"),
  handleInputErrors,
  deleteProduct
);

export default router;
