import React from "react";
import { nextauthOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

const getProperties = async () => {
  const res = await fetch("http://localhost:3000/api/properties");

  const data = await res.json();

  return {
    properties: data.properties,
  };
};

export default async function Properties() {
  // get the session
  const session = await getServerSession(nextauthOptions);

  // redirect to signin if there is no session.
  if (!session?.user) {
    const url = new URL("/api/auth/signin", "http://localhost:3000");
    url.searchParams.append("callbackUrl", "/properties");
    redirect(url.toString());
  }

  const { properties } = await getProperties();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {properties.length &&
        properties.map((property: any, index: number) => {
          return <PropertyCard key={index} details={property} />;
        })}
    </div>
  );
}