import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { nextauthOptions } from "@/lib/nextauthOptions";
import { IPropertyDetails } from "./PropertyForm";

const PropertyCard = async ({ details }: { details: IPropertyDetails }) => {
  const session = await getServerSession(nextauthOptions);

  const isPropertyOwner = session?.user?.email === details.propertyOwner;

  return (
    <div className="bg-white shadow-lg rounded p-4 w-80 m-4 relative overflow-hidden">
      {details.isLeased && (
        <div className="absolute right-0 top-0 h-16 w-16">
          <div className="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
            Leased
          </div>
        </div>
      )}
      <img
        src={details.propertyImageUrl}
        alt={details.propertyAddress}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{details.propertyName}</h3>
        <p className="text-gray-700">
          <strong>Owner:</strong> {details.propertyAddress}
        </p>
        <p className="text-gray-700">
          <strong>Owner:</strong> {details.ownerName}
        </p>
        <p className="text-gray-700">
          <strong>Monthly Rent:</strong> ${details.monthlyRent}
        </p>
        <p className="text-gray-700">
          <strong>Lease Application Fee:</strong> ${details.leaseApplicationFee}
        </p>
        <p className="text-gray-700">
          <strong>Reservation Fee:</strong> ${details.reservationFee}
        </p>
        <Link href={`/properties/${details._id}`}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
            disabled={details.isLeased || isPropertyOwner}
          >
            Rent Property
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
