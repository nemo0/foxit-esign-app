// components/PropertyForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { redirect } from "next/navigation";

interface PropertyDetails {
  propertyAddress: string;
  monthlyRent: number;
  leaseApplicationFee: number;
  reservationFee: number;
  ownerName: string;
  propertyImageUrl: string;
}

const PropertyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyDetails>();

  const onSubmit = async (data: PropertyDetails) => {
    try {
      await axios.post("/api/properties", data);
      alert("Property created successfully");
      redirect("/properties");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-center mb-4 font-bold">
          Add a New Property
        </h3>
        <label htmlFor="propertyAddress">Property Address</label>
        <textarea
          rows={4}
          id="propertyAddress"
          placeholder="Property Address"
          {...register("propertyAddress", { required: true })}
          className="mb-4 p-2 w-full border rounded"
        />
        {errors.propertyAddress && (
          <p className="text-red-500 text-xs mb-4">
            {errors.propertyAddress.message}
          </p>
        )}

        <label htmlFor="monthlyRent">Monthly Rent</label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="monthlyRent"
            placeholder="Monthly Rent"
            {...register("monthlyRent", { required: true })}
            className="p-2 pl-10 w-full border rounded"
            type="number"
          />
          {errors.monthlyRent && (
            <p className="text-red-500 text-xs mb-4">
              {errors.monthlyRent.message}
            </p>
          )}
        </div>
        <label htmlFor="leaseApplicationFee">Lease Application Fee</label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="leaseApplicationFee"
            placeholder="Lease Application Fee"
            {...register("leaseApplicationFee", { required: true })}
            className="p-2 pl-10 w-full border rounded"
            type="number"
          />
          {errors.leaseApplicationFee && (
            <p className="text-red-500 text-xs mb-4">
              {errors.leaseApplicationFee.message}
            </p>
          )}
        </div>
        <label htmlFor="reservationFee">Reservation Fee</label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="reservationFee"
            placeholder="Reservation Fee"
            {...register("reservationFee", { required: true })}
            className="p-2 pl-10 w-full border rounded"
            type="number"
          />
          {errors.reservationFee && (
            <p className="text-red-500 text-xs mb-4">
              {errors.reservationFee.message}
            </p>
          )}
        </div>
        <label htmlFor="ownerName">Property Owner</label>
        <input
          id="ownerName"
          placeholder="Property Owner"
          {...register("ownerName", { required: true })}
          className="mb-4 p-2 w-full border rounded"
        />
        {errors.ownerName && (
          <p className="text-red-500 text-xs mb-4">
            {errors.ownerName.message}
          </p>
        )}

        <label htmlFor="propertyImageUrl">Property Image URL</label>
        <input
          id="propertyImageUrl"
          placeholder="Property Image URL"
          {...register("propertyImageUrl", { required: true })}
          className="mb-4 p-2 w-full border rounded"
        />
        {errors.propertyImageUrl && (
          <p className="text-red-500 text-xs mb-4">
            {errors.propertyImageUrl.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
