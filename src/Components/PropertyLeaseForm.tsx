"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { PropertyDetailProps } from "./PropertyDetail";
import axios from "axios";
import { redirect } from "next/navigation";

type FormData = {
  leaseStartDate: string;
  leaseEndDate: string;
  reservationFeePaymentMode: "cash" | "check" | "money order";
  applicantName: string;
  agreeConditions: boolean;
  applicantFirstName: string;
  applicantMiddleName: string;
  applicantLastName: string;
  visitedProperty: boolean;
  notVisitedProperty: boolean;
  applicantSS: string;
  dateOfBirth: string;
  driverLicenseNumber: string;
  driverLicenseState: string;
  homePhone: string;
  workPhone: string;
  cell: string;
  email: string;
  emergencyContact: string;
  spouseName: string;
};

const LeaseForm: React.FC<PropertyDetailProps> = ({ property }) => {
  const { register, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `/api/properties/${property._id}/lease`,
        {
          ...data,
          ...property,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div>
        <label htmlFor="leaseStartDate" className="block mb-2">
          Lease Start Date
        </label>
        <input
          {...register("leaseStartDate", { required: true })}
          type="date"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="leaseEndDate" className="block mb-2">
          Lease End Date
        </label>
        <input
          {...register("leaseEndDate", { required: true })}
          type="date"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="reservationFeePaymentMode" className="block mb-2">
          Reservation Fee Payment Mode
        </label>
        <select
          {...register("reservationFeePaymentMode", { required: true })}
          className="border p-2 w-full"
        >
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="money order">Money Order</option>
        </select>
      </div>

      <div>
        <label htmlFor="applicantFirstName" className="block mb-2">
          Applicant First Name
        </label>
        <input
          {...register("applicantFirstName", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="applicantMiddleName" className="block mb-2">
          Applicant Middle Name
        </label>
        <input
          {...register("applicantMiddleName")}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="applicantLastName" className="block mb-2">
          Applicant Last Name
        </label>
        <input
          {...register("applicantLastName", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="visitedProperty" className="block mb-2">
          I have visited the Property and had the opportunity to inspect it. I
          understand that I am accepting the Property &quot;as is&quot; except
          for any stipulations, changes or modifications that are listed as
          contingencies of this application. If any stipulations cannot be met,
          or an acceptable compromise agreed to by all parties, I understand
          that any fees I have paid with the submission of this Rental
          Application will be returned to me.
        </label>
        <input
          {...register("visitedProperty", { required: true })}
          type="checkbox"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="notVisitedProperty" className="block mb-2">
          I have not yet visited or seen the Property in person. Nor am I
          relying on any information, photos, or any other representations of
          the Agent through whom I learned of this Property except for
          information the Agent provided to me in writing. However I understand
          that if my application is approved, any fees I have paid with the
          submission of this Rental Application are non-refundable and any
          obligations under the lease I sign are fully enforceable. Having not
          viewed the Property will in no way be a reason for any refund or
          cancellation of the agreement.
        </label>
        <input
          {...register("notVisitedProperty", { required: true })}
          type="checkbox"
          className="border p-2 w-full"
        />
      </div>

      <h4 className="text-lg font-bold">Applicant Information</h4>

      <div>
        <label htmlFor="applicantSS" className="block mb-2">
          Applicant Social Security Number
        </label>
        <input
          {...register("applicantSS", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block mb-2">
          Applicant Date of Birth
        </label>
        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="driverLicenseNumber" className="block mb-2">
          Applicant Driver License Number
        </label>
        <input
          {...register("driverLicenseNumber", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="driverLicenseState" className="block mb-2">
          Applicant Driver License State
        </label>
        <input
          {...register("driverLicenseState", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div className="flex w-full justify-between">
        <div>
          <label htmlFor="homePhone" className="block mb-2">
            Applicant Home Phone
          </label>
          <input
            {...register("homePhone", { required: true })}
            type="text"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="workPhone" className="block mb-2">
            Applicant Work Phone
          </label>
          <input
            {...register("workPhone", { required: true })}
            type="text"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="cell" className="block mb-2">
            Applicant Cell Phone
          </label>
          <input
            {...register("cell", { required: true })}
            type="text"
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block mb-2">
          Applicant Email Address
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="emergencyContact" className="block mb-2">
          Emergency Contact Information
        </label>
        <input
          {...register("emergencyContact", { required: true })}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="spouseName" className="block mb-2">
          Spouse/Significant Other Name
        </label>
        <input
          {...register("spouseName")}
          type="text"
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default LeaseForm;
