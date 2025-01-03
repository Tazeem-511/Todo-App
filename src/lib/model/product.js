// src/lib/model/product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  description: { type: String, required: true }, 
  standred: { type: String, required: true }, 
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
