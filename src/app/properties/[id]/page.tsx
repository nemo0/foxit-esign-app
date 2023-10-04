import PropertyDetail from "@/components/PropertyDetail";
import LeaseForm from "@/components/PropertyLeaseForm";
import { ObjectId } from "mongodb";
import React from "react";
import axios from "axios";

const getProperty = async (id: ObjectId) => {
  const res = await axios.get(`http://localhost:3000/api/properties/${id}`);

  const data = res.data;

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
