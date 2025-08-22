import React from "react";

export default async function SingleProduct({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/product/${id}`, { cache: "no-store" });
  if (!res.ok) return <div>Product not found!</div>;

  const product = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-gray-500 mb-2">Category: {product.category}</p>
        <p className="text-green-600 font-semibold mb-2">${product.price}</p>

        {product.features?.length > 0 && (
          <ul className="list-disc list-inside text-gray-700">
            {product.features.map((f, idx) => <li key={idx}>{f}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
