import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">MyStore</h2>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MyStore. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-white transition">
              Products
            </Link>
            <Link href="/login" className="hover:text-white transition">
              Login
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white transition">
              🌐
            </a>
            <a href="#" className="hover:text-white transition">
              🐦
            </a>
            <a href="#" className="hover:text-white transition">
              📘
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
