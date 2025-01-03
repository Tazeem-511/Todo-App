"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import "./product.css";
import Delete from "@/lib/delete";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameSearch, setNameSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState("");

  // Wrap getProducts with useCallback
  const getProducts = useCallback(async () => {
    try {
      let response = await fetch("/api/products");
      let result = await response.json();
      if (response.ok) {
        setProducts(result.data);
        setFilteredProducts(result.data);
      } else {
        console.error("Failed to fetch products:", result.message);
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  }, []);

  // Wrap filterProducts with useCallback
  const filterProducts = useCallback(() => {
    let filtered = [...products];

    if (nameSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    if (classSearch) {
      filtered = filtered.filter((product) => product.standred === classSearch);
    }

    if (ageSearch) {
      filtered = filtered.filter((product) => product.age == ageSearch);
    }

    setFilteredProducts(filtered);
  }, [products, nameSearch, classSearch, ageSearch]);

  // Call getProducts once on mount
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Call filterProducts whenever search values change
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Products List</h1>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by class..."
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
          />
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by age..."
            value={ageSearch}
            onChange={(e) => setAgeSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="navigation-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/addproduct" className="nav-link">
          Add Product
        </Link>
      </div>

      <div className="product-list">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <main className="main-container">
                <h3 className="product-name">{product.name}</h3>
                <p>
                  <strong>Email:</strong> {product.email}
                </p>
                <p>
                  <strong>Age:</strong> {product.age}
                </p>
                <p>
                  <strong>Class:</strong> {product.standred}
                </p>
              </main>
              <div className="edit-link pro-btn">
                {product._id ? (
                  <Link
                    href={`/products/${product._id}`}
                    className="edit-button"
                  >
                    Edit
                  </Link>
                ) : (
                  <span>No ID</span>
                )}
              </div>
              <div className="del-link">
                <Delete id={product._id} />
              </div>
            </div>
          ))
        ) : (
          <div>No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Products;
