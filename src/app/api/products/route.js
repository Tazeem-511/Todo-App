// src/api/products/route.js
import mongoose from "mongoose";
import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

const DB_URL = process.env.db;
let isConnected = false;

// MongoDB Connection Function
async function connectToDB() {
  if (!isConnected) {
    await mongoose.connect(DB_URL);
    isConnected = true;
  }
}

// GET Method to Fetch All Products
export async function GET() {
  try {
    await connectToDB();

    const data = await Product.find();
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No products found" });
    }

    return NextResponse.json({ result: "ok", data: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Connection failed", message: error.message },
      { status: 500 }
    );
  }
}

// POST Method to Add a Product with Email Duplication Check
export async function POST(req) {
  try {
    await connectToDB();

    const payload = await req.json();

    // Check if email already exists
    const existingProduct = await Product.findOne({ email: payload.email });
    if (existingProduct) {
      return NextResponse.json(
        {
          error: "Email already exists!",
          message: "Duplicate email not allowed.",
        },
        { status: 400 }
      );
    }

    // Save the new product
    const product = new Product(payload);
    await product.save();

    return NextResponse.json({ result: "ok", data: product });
  } catch (error) {
    return NextResponse.json(
      { error: "Save failed", message: error.message },
      { status: 500 }
    );
  }
}
