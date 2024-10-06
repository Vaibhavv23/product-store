import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// post bcoz we are adding/creating products to DB
router.post("/", createProduct);

// get all products on UI from DB
router.get("/", getProducts);

// updating a product
router.put("/:id", updateProduct);

// deleting the product
router.delete("/:id", deleteProduct);

export default router;
