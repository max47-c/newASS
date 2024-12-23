"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/router";

// Validation schema using Zod
const schema = z.object({
  name: z.string().min(3, { message: "Name is required and must be at least 3 characters long!" }),
  phone: z.string().min(10, { message: "Contact must be at least 10 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  address: z.string().min(3, { message: "Address is required and must be at least 3 characters long!" }),
  bloodType: z.enum([
    "A_positive",
    "A_negative",
    "B_positive",
    "B_negative",
    "AB_positive",
    "AB_negative",
    "O_positive",
    "O_negative",
  ]),
  urgency: z.enum(["Low", "Medium", "High"]),
});

type GuestRequestInputs = z.infer<typeof schema>;

const GuestRequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestRequestInputs>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await fetch("/api/user-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message); // Show success message
        setError(""); // Clear any previous errors
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  });

  return (
    <form
      className="flex flex-col gap-6 bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Request Blood as Guest</h1>

      {/* Success Message */}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Phone"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Blood Type</label>
          <select
            {...register("bloodType")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select...</option>
            <option value="A_positive">A+</option>
            <option value="A_negative">A-</option>
            <option value="B_positive">B+</option>
            <option value="B_negative">B-</option>
            <option value="AB_positive">AB+</option>
            <option value="AB_negative">AB-</option>
            <option value="O_positive">O+</option>
            <option value="O_negative">O-</option>
          </select>
          {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Urgency</label>
          <select
            {...register("urgency")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select...</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.urgency && <p className="text-red-500 text-xs mt-1">{errors.urgency.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-red-500 text-white rounded-md p-4 text-center text-lg font-medium hover:bg-red-600 transition w-full mt-6"
      >
        Submit Request
      </button>
    </form>
  );
};

export default GuestRequestForm;
