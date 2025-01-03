"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // Import the React.use() hook for unwrapping the params promise
import "./edit.css";
import Link from "next/link";

const EditProduct = ({ params }) => {
  const [name, setName] = useState(""); // Initialized as empty string
  const [email, setEmail] = useState(""); // Initialized as empty string
  const [age, setAge] = useState(""); // Initialized as empty string
  const [description, setDescription] = useState(""); // Initialized as empty string
  const [standred, setStandred] = useState("");
  const [error, setError] = useState(""); // Error state to show validation messages
  const [productId, setProductId] = useState(""); // Store the productId
  const router = useRouter();

  // Unwrap the params promise to access the route parameters
  const { editproduct } = use(params);

  useEffect(() => {
    if (editproduct) {
      setProductId(editproduct);
      getProductDetail(editproduct); // Fetch existing product details for editing
    }
  }, [editproduct]);

  // Function to fetch the product details
  const getProductDetail = async (productId) => {
    let productData = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    productData = await productData.json();
    if (productData.success) {
      const result = productData.result;
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
      setDescription(result.description);
      setStandred(result.standred);
    } else {
      console.log("Error fetching product details.");
    }
  };

  // Function to handle form validation
  const validateForm = () => {
    if (!/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(name) || name.trim().length < 3) {
      setError("Product Name must be alphanumeric and at least 3 characters long.");
      return false;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(age)) {
      setError("Product Age must be exactly 10 digits.");
      return false;
    }

    if (description.trim().length < 10) {
      setError("Product Description must be at least 10 characters long.");
      return false;
    }

    if (!/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(standred)) {
      setError("Class must be alphanumeric and cannot be blank.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  // Function to handle the form submission and update product
  const updateProduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PUT", // Using PUT for update request
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, age, description, standred }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Product Updated Successfully");
        router.push("/products"); // Redirect to products list page after success
      } else {
        alert("Failed to update product: " + result.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="edit-body">
      <Link href="/" className="home-link">
        Home
      </Link>
      <Link href="/products" className="product-link">
        Details List
      </Link>
      <div className="contact-us">
        <div className="form-content">
          <h1>Edit Details</h1>
          <form onSubmit={updateProduct}>
            {error && <p className="error">{error}</p>}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Product Email"
              required
            />
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Number"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Address"
              required
            />
            <input
              type="text"
              value={standred}
              onChange={(e) => setStandred(e.target.value)}
              placeholder="Role"
              required
            />
            <button className="edit-btn" type="submit">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
