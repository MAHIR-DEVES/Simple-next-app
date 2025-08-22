'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      if (result.error === "User already exists") {
        await Swal.fire({
          icon: "warning",
          title: "Already Registered",
          text: "You are already a member. Redirecting to Sign In...",
          confirmButtonColor: "#3085d6",
        });
        router.push("/register");
      } else {
        // ❌ Generic signup error
        await Swal.fire({
          icon: "error",
          title: "Sign Up Failed",
          text: result.error || "Something went wrong.",
          confirmButtonColor: "#d33",
        });
      }
      return;
    }

    // ✅ Success — clear form and show success alert
    reset();

    await Swal.fire({
      icon: "success",
      title: "Account Created",
      text: "Your account has been created successfully. Logging you in...",
      confirmButtonColor: "#3085d6",
    });

    // ✅ Auto-login after signup
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (signInResult?.ok) {
      router.push("/");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 border-gray-300 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 border-gray-300 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 border-gray-300 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 chars
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
