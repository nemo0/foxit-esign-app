"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface CreateUserRequestBody {
  firstName: string;
  lastName: string;
  emailId: string;
  address: string;
  password: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserRequestBody>();

  const router = useRouter();

  const onSubmit = async (data: CreateUserRequestBody) => {
    try {
      await axios.post(`/api/create-user`, data);
      alert("User created successfully");
      router.push("/api/auth/signin");
    } catch (error) {
      console.log(error);
      alert("Error creating user");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <form
          className="bg-white p-6 rounded shadow-md w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            Sign Up for a New Account
          </h3>
          <input
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.firstName && <span>This field is required</span>}
          <input
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.lastName && <span>This field is required</span>}
          <input
            placeholder="Email ID"
            {...register("emailId", { required: true, pattern: /^\S+@\S+$/i })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.emailId && <span>Please enter a valid email address</span>}
          <input
            placeholder="Address"
            {...register("address", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.address && <span>This field is required</span>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.password && <span>This field is required</span>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
