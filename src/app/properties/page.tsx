import React from "react";
import { nextauthOptions } from "@/lib/nextauthOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

// Create a function to get the properties
const getProperties = async () => {
  const res = await fetch("http://localhost:3000/api/properties");

  const data = await res.json();

  return {
    properties: data.properties,
  };
};

export default async function Properties() {
  // Get the session
  const session = await getServerSession(nextauthOptions);

  // Redirect to signin if there is no session.
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Call the getProperties function
  const { properties } = await getProperties();

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {properties.length &&
          properties.map((property: any, index: number) => {
            return <PropertyCard key={index} details={property} />;
          })}
      </div>
    </div>
  );
}
