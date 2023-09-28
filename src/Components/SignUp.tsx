// components/SignUpForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface RequestBody {
  firstName: string;
  lastName: string;
  emailId: string;
  address: string;
  userRole: string;
  department: string;
  title: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestBody>();

  const onSubmit = async (data: RequestBody) => {
    try {
      const response = await axios.post(`/api/create-user`, data);
      console.log(response);
      alert("User created successfully");
    } catch (error) {
      console.log(error);
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
          <select
            {...register("userRole", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          >
            {/* Add your user roles here */}
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          {errors.userRole && <span>This field is required</span>}
          <input
            placeholder="Department"
            {...register("department", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.department && <span>This field is required</span>}
          <input
            placeholder="Title"
            {...register("title", { required: true })}
            className="mb-4 p-2 w-full border rounded"
          />
          {errors.title && <span>This field is required</span>}
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
