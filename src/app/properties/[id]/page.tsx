import PropertyDetail from "@/components/PropertyDetail";
import LeaseForm from "@/components/PropertyLeaseForm";
import { ObjectId } from "mongodb";
import React from "react";

const getProperty = async (id: ObjectId) => {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`);

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
  const { property } = await getProperty(new ObjectId(id));

  return (
    <div className="container mx-auto max-w-7xl">
      <PropertyDetail property={property} />
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-2">Lease Property</h3>
        <LeaseForm property={property} />
      </div>
    </div>
  );
}
