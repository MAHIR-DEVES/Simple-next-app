import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover amazing products at the best prices
        </p>
        <button className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"> 
          Shop Now
        </button>
      </div>
    </section>
  );
}
