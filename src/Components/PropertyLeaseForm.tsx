"use client";

import React, { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { PropertyDetailProps } from "./PropertyDetail";
import axios from "axios";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useRouter } from "next/navigation";

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
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [embedUrl, setEmbedUrl] = React.useState("");
  const [webhookData, setWebhookData] = React.useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (isFormSubmitted) {
      // only start polling if form is submitted
      const interval = setInterval(async () => {
        const res = await fetch("/api/properties/webhook");
        if (res.status === 200) {
          const data = await res.json();
          setWebhookData(data);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [isFormSubmitted]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `/api/properties/${property._id}/lease`,
        {
          ...data,
          ...property,
        }
      );
      setEmbedUrl(response.data.embeddedSessionURL);
      setModalIsOpen(true);
      setIsFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!webhookData ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
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

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
          <PureModal
            isOpen={modalIsOpen}
            closeButton="x"
            closeButtonPosition="bottom"
            className="w-full h-full"
            width="80%"
            onClose={() => {
              setModalIsOpen(false);
              return true;
            }}
          >
            <div className="w-full h-full overflow-auto" data-role="content">
              <iframe
                src={embedUrl}
                className="w-11/12 absolute h-5/6"
                frameBorder="0"
              ></iframe>
            </div>
          </PureModal>
        </div>
      ) : (
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-green-800">
          <p className="text-xl font-semibold">Property Leased Successfully!</p>
        </div>
      )}
    </>
  );
};

export default LeaseForm;
