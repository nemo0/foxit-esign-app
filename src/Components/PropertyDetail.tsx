import React from "react";
import { IPropertyDetails } from "./PropertyForm";

const PropertyDetail = ({ property }: { property: IPropertyDetails }) => {
  return (
    <div className="flex p-6">
      <div className="w-1/2">
        <img
          src={property.propertyImageUrl}
          alt="Property"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="w-1/2 p-12 bg-white rounded-lg ml-6">
        <h2 className="text-3xl font-bold mb-8 text-indigo-700">
          {property.propertyName}
        </h2>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Property Address:</strong>
          <span className="text-indigo-600"> {property.propertyAddress}</span>
        </p>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Monthly Rent:</strong>
          <span className="text-indigo-600"> ${property.monthlyRent}</span>
        </p>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Lease Application Fee:</strong>
          <span className="text-indigo-600">
            {" "}
            ${property.leaseApplicationFee}
          </span>
        </p>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Reservation Fee:</strong>
          <span className="text-indigo-600"> ${property.reservationFee}</span>
        </p>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Property Owner Email: </strong>
          {property.propertyOwner}
        </p>
        <p className="mb-4 text-lg">
          <strong className="font-medium">Owner Name: </strong>
          {property.ownerName}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetail;
