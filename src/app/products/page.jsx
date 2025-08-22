"use client";
import { getMethod } from "@/services/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getMethod();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
          >
            {/* Image */}
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
            <p className="text-lg font-semibold text-green-600">
              ${product.price}
            </p>

            {/* View More */}
            <Link
              href={`/products/${product._id}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
