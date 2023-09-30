"use client";
import React from "react";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const allProperties = async () => {
      const response = await axios.get("/api/properties");
      setProperties(response.data.properties);
    };

    allProperties();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {properties.length &&
        properties.map((property: any, index: number) => {
          return <PropertyCard key={index} details={property} />;
        })}
    </div>
  );
}
