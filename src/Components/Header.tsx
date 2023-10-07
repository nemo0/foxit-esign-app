import React from "react";

import { Great_Vibes } from "next/font/google";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/lib/nextauthOptions";

const greatVibes = Great_Vibes({
  subsets: ["latin-ext"],
  weight: ["400"],
});

const Header = async () => {
  const session = await getServerSession(nextauthOptions);
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <h1 className={`text-3xl font-bold ${greatVibes.className}`}>
              Estate Magic
            </h1>
          </Link>
        </div>
        {!session?.user ? (
          <div className="flex space-x-4">
            <Link href="/api/auth/signin">
              <button className="px-6 py-2 bg-pink-500 rounded-md hover:bg-pink-600">
                Sign In
              </button>
            </Link>
            <Link href={`/sign-up`}>
              <button className="px-6 py-2 bg-gray-500 rounded-md hover:bg-gray-600">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex space-x-4">
              <Link href="/properties">
                <button className="px-6 py-2 bg-pink-500 rounded-md hover:bg-pink-600">
                  Rent a Property
                </button>
              </Link>
              <Link href={`/properties/create`}>
                <button className="px-6 py-2 bg-gray-500 rounded-md hover:bg-gray-600">
                  Lease a Property
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
