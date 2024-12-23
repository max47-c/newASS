"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useCurrentUser } from '@/hooks/use-current-user';

// Validation schema using Zod
const schema = z.object({
  contact: z.string().min(10, { message: "Contact must be at least 10 characters long!" }),
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
  contactInfo: z.string().optional(),  // Optional field, remove if not needed
});

type UserRequestInputs = z.infer<typeof schema>;

const UserRequestForm = () => {
  const fetchedUser = useCurrentUser(); // Fetch user data
  const [role, setRole] = useState<UserRole | null>(null); // Allow null for loading state


  useEffect(() => {
    // Set role when user data is available
    if (fetchedUser?.role) {
      setRole(fetchedUser.role); // Adjust based on your user structure
    }
  }, [fetchedUser]);

  // Check if user is authenticated

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequestInputs>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await fetch("/api/user-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: fetchedUser?.firstName,  // Assuming you want the first name
          email: fetchedUser?.emailAddresses, // Clerk's email address
        }),
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
      className="flex flex-col gap-6 bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-auto"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Request Blood</h1>

      {/* Success Message */}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Name (Pre-filled for the logged-in user but editable) */}
      <div className="space-y-4">
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            defaultValue={fetchedUser?.firstName || ""}
            placeholder="Name"
            {...register("name")}
          />
        </div>

        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            defaultValue={fetchedUser?.emailAddresses || ""}
            placeholder="Email"
            {...register("email")}
          />
        </div>

        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Contact"
            {...register("contact")}
          />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
        </div>
      </div>

      {/* Blood Type */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Blood Type</label>
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

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Urgency</label>
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

      <button
        type="submit"
        className="bg-red-500 text-white rounded-md p-4 text-center text-lg font-medium hover:bg-red-600 transition w-full mt-6"
      >
        Submit Request
      </button>
    </form>
  );
};

export default UserRequestForm;
