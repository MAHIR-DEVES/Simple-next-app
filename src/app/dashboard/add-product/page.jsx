"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import addProduct from "@/services/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {data: session, status} = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/register')
    }
  }, [status, router])

  if(status === 'loading') return <p>Loading...</p>

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const productData = {
        ...data,
        features: data.features
          .split("\n")
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
      };

      const newProduct = await addProduct(productData);
      console.log("Product added:", newProduct);
      console.log(data);
      alert("Product added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className={`w-full p-2 rounded bg-gray-800 border ${
              errors.name ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full p-2 rounded bg-gray-800 border ${
              errors.description ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className={`w-full p-2 rounded bg-gray-800 border ${
              errors.price ? "border-red-500" : "border-gray-700"
            }`}
            placeholder="Enter product price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            {...register("category")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter product category"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="url"
            {...register("image")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Enter product image URL"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block mb-1">Product Features (one per line)</label>
          <textarea
            {...register("features")}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder={`e.g.\n- Lightweight design\n- Waterproof material\n- 2 year warranty`}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
