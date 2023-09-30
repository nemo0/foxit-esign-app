// components/PropertyDetail.tsx

import React from "react";

export interface Property {
  _id: string;
  propertyAddress: string;
  monthlyRent: string;
  leaseApplicationFee: string;
  reservationFee: string;
  propertyOwner: string;
  ownerName: string;
  propertyImageUrl: string;
}

export interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="flex">
      <div className="flex w-full">
        <div className="w-1/2 h-full">
          <img
            src={property.propertyImageUrl}
            alt="Property"
            className="w-full w-full object-cover"
          />
        </div>

        <div className="w-1/2 p-12 bg-white">
          <h2 className="text-2xl font-bold mb-6">
            {property.propertyAddress}
          </h2>
          <p className="mb-4">
            <strong>Monthly Rent:</strong> ${property.monthlyRent}
          </p>
          <p className="mb-4">
            <strong>Lease Application Fee:</strong> $
            {property.leaseApplicationFee}
          </p>
          <p className="mb-4">
            <strong>Reservation Fee:</strong> ${property.reservationFee}
          </p>
          <p className="mb-4">
            <strong>Property Owner Email:</strong> {property.propertyOwner}
          </p>
          <p className="mb-4">
            <strong>Owner Name:</strong> {property.ownerName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
