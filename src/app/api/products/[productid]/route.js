import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  // params को await करो
  const DB_URL = process.env.db;
  const { productid } = await params;
  const filter = { _id: productid };
  const payload = await request.json();
  await mongoose.connect(DB_URL);
  const result = await Product.findOneAndUpdate(filter, payload);
  // console.log(payload);
  return NextResponse.json({ result, success: true });
}

export async function GET(request, { params }) {
  // params को await करो
  const DB_URL = process.env.db;
  const { productid } = await params;
  const record = { _id: productid };
  await mongoose.connect(DB_URL);
  const result = await Product.findById(record);
  // console.log(record);
  return NextResponse.json({ result, success: true });
}

















export async function DELETE(request, { params }) {
  const DB_URL = process.env.db;
  const { productid } = params;

  try {
    // MongoDB कनेक्शन चेक करें
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(DB_URL);
    }

    const filter = { _id: productid };

    // प्रोडक्ट को हटाने का प्रयास करें
    const result = await Product.deleteOne(filter);

    // चेक करें कि डिलीट हुआ है या नहीं
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Product not found or already deleted.",
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
}
