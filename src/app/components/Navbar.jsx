"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isUser = !!session;

  console.log(isUser);

  return (
    <div>
      <header className=" px-5 py-5 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <img className="w-34" src="/Logo.png" alt="" />
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            {isUser && (
              <>
                <Link href="/dashboard/add-product">Dashboard</Link>
                <button onClick={() => signOut({callbackUrl: '/login'})} className="bg-red-400 px-5 py-2">Sign Out</button>
              </>
            )}

            {!isUser && (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
