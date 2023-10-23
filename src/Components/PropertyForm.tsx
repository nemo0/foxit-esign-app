"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface IPropertyDetails {
  _id?: string;
  propertyOwner?: string;
  propertyName: string;
  propertyAddress: string;
  monthlyRent: number;
  leaseApplicationFee: number;
  reservationFee: number;
  ownerName: string;
  propertyImageUrl: string;
  isLeased: boolean;
}

const PropertyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPropertyDetails>();

  const router = useRouter();

  // Update the onSubmit function
  const onSubmit = async (data: IPropertyDetails) => {
    try {
      const payload = {
        ...data,
        isLeased: false,
      };

      const { data: res } = await axios.post("/api/properties", payload);
      alert("Property created successfully");
      router.push(`/properties/${res.property.insertedId}`);
    } catch (error: any) {
      console.log(error);
      alert("Error creating property");
    }
  };

  return (
    <div className="bg-gray-200 max-w-7xl mx-auto container">
      <form
        className="bg-white p-8 rounded space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl mb-6 font-bold">Add a New Property</h3>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="propertyName" className="font-semibold mb-2">
              Property Name
            </label>
            <input
              id="propertyName"
              placeholder="Property Name"
              {...register("propertyName", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.propertyName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="propertyAddress" className="font-semibold mb-2">
              Property Address
            </label>
            <textarea
              rows={4}
              id="propertyAddress"
              placeholder="Property Address"
              {...register("propertyAddress", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.propertyAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyAddress.message}
              </p>
            )}
          </div>

          {/* Rest of the input fields */}
          <div className="flex flex-col">
            <label htmlFor="monthlyRent" className="font-semibold mb-2">
              Monthly Rent
            </label>
            <input
              id="monthlyRent"
              placeholder="Monthly Rent"
              {...register("monthlyRent", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              type="number"
            />
            {errors.monthlyRent && (
              <p className="text-red-500 text-xs mt-1">
                {errors.monthlyRent.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="leaseApplicationFee" className="font-semibold mb-2">
              Lease Application Fee
            </label>
            <input
              id="leaseApplicationFee"
              placeholder="Lease Application Fee"
              {...register("leaseApplicationFee", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              type="number"
            />
            {errors.leaseApplicationFee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.leaseApplicationFee.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="reservationFee" className="font-semibold mb-2">
              Reservation Fee
            </label>
            <input
              id="reservationFee"
              placeholder="Reservation Fee"
              {...register("reservationFee", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              type="number"
            />
            {errors.reservationFee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reservationFee.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="ownerName" className="font-semibold mb-2">
              Property Owner
            </label>
            <input
              id="ownerName"
              placeholder="Property Owner"
              {...register("ownerName", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ownerName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="propertyImageUrl" className="font-semibold mb-2">
              Property Image URL
            </label>
            <input
              id="propertyImageUrl"
              placeholder="Property Image URL"
              {...register("propertyImageUrl", { required: true })}
              className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.propertyImageUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyImageUrl.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
