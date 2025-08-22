"use client";
import { getMethod } from "@/services/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMethod();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className=" bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
        >
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover rounded-xl mb-4"
          />

          {/* Product Info */}
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600">
            {product.description.length > 200
              ? product.description.slice(0, 200) + "..."
              : product.description}
          </p>
          <p className="text-gray-500 text-sm">Category: {product.category}</p>
          <p className="text-lg font-semibold text-green-600">
            ${product.price}
          </p>

          {/* Features */}
          <ul className="list-disc list-inside mt-2 text-gray-700 text-sm">
            {product.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>

          {/* View more button */}
          <Link
            href={`/products/${product._id}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View More
          </Link>
        </div>
      ))}
    </div>
  );
}
