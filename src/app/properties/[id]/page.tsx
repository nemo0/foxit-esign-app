import PropertyDetail from "@/components/PropertyDetail";
import LeaseForm from "@/components/PropertyLeaseForm";
import { ObjectId } from "mongodb";
import React from "react";

// Create a function to get the property
const getProperty = async (id: ObjectId) => {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return {
    property: data.property,
  };
};

export default async function PropertyDetailPage({
  params: { id },
}: {
  params: {
    id: ObjectId;
  };
}) {
  // Call the getProperty function
  const { property } = await getProperty(new ObjectId(id));

  return (
    <div className="container mx-auto max-w-7xl">
      <PropertyDetail property={property} />
      <div className="mt-8">
        {!property.isLeased ? (
          <LeaseForm property={property} />
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-indigo-700">
              This property is already leased
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
