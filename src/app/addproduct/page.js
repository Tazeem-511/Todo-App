"use client"
import React, { useState } from "react";
import Link from "next/link";
import "./form.css";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [standred, setStandred] = useState("");

  const [error, setError] = useState(""); // Error state to show validation messages

  // Form validation
 const validateForm = () => {
   if (name.trim() !== name) {
     setError("Name should not have spaces at the start or end.");
     return false;
   }

   if (isNaN(age) || age.trim() === "") {
     setError("Age must be a valid number.");
     return false;
   }

   if (/\s/.test(age)) {
     setError("Age should not have spaces.");
     return false;
   }

   if (name === age) {
     setError("Name and age cannot be the same.");
     return false;
   }

   setError(""); // Clear error if all validations pass
   return true;
 };


 const addProduct = async (e) => {
   e.preventDefault();

   if (!validateForm()) return; // Stop if validation fails

   console.log("Submitted Data:", {
     name,
     email,
     age,
     description,
     standred,
   });

   try {
     const response = await fetch("/api/products", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         name,
         email,
         age: parseInt(age), // Ensure age is a number
         description,
         standred,
       }),
     });

     const result = await response.json();
     console.log("Server Response:", result); // Debug API response
     if (response.ok) {
       alert("Product Added Successfully");
       setName("");
       setEmail("");
       setAge("");
       setDescription("");
       setStandred("");
     } else {
       alert("Failed to add product: " + result.message);
     }
   } catch (error) {
     console.error("Error adding product:", error);
     alert("Something went wrong. Please try again.");
   }
 };


  return (
    <div className="add-body">
      <Link href="/" className="home-link">
        Home
      </Link>
      <Link href="/products" className="product-link">
        Product
      </Link>
      <div className="contact-us">
        <div className="form-content">
          <h1>Add Products</h1>
          <form onSubmit={addProduct}>
            {error && <p className="error">{error}</p>}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your Age"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your Description"
              required
            />
            <input
              type="text"
              value={standred}
              onChange={(e) => setStandred(e.target.value)}
              placeholder="Class"
              required
            />
          
            <button className="add-btn" type="submit">
              Add Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
