"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { bloodFormSchema, BloodFormSchema } from "@/lib/formValidation";
import { createBloodRequest, createUser } from "@/lib/actions";
import { toast } from "react-toastify";

const GuestRequestForm = ({ data }: { data?: bloodFormSchema}) => {
  const [state, setState] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<bloodFormSchema>({
    resolver: zodResolver(BloodFormSchema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bloodType: formData.bloodType,
        sex: formData.sex,
        role: "GUEST",
        bio: " ",
      };

      await createUser(state, newUser);
      toast.success("Guest created successfully!");

      await createBloodRequest(state, formData);

      setState({ success: true, error: false });
      toast.success("Request successfully submitted!");
    } catch (error) {
      console.error("Error:", error);
      setState({ success: false, error: true });
      toast.error("Something went wrong!");
    }
  });

  return (
    <form
      className="flex flex-col gap-6 bg-white p-8 md:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Request Blood</h1>

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
          <label className="block text-sm font-medium text-gray-600 mb-2">Sex</label>
          <select
            {...register("sex")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Age</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="number"
            min="1"
            placeholder="Age"
            {...register("age", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Age must be a positive number",
            })}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Blood Quantity (in ml)</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            type="number"
            min="1"
            placeholder="Enter quantity in ml"
            {...register("bloodQty", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Blood quantity must be a positive number",
            })}
          />
          {errors.bloodQty && (
            <p className="text-red-500 text-xs mt-1">{errors.bloodQty.message}</p>
          )}
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
