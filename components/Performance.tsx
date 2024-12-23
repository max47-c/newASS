"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Image from "next/image";
import { UserData } from "@/lib/data"; // Adjust the import path as needed

// Function to calculate the donation and request data dynamically
const calculatePerformanceData = (userId: number) => {
  const user = UserData.find(user => user.id === userId);

  if (user) {
    const totalRequests = user.NumReq + user.NumDon;  // Calculate total requests and donations
    const requestPercentage = parseFloat(((user.NumReq / totalRequests) * 100).toFixed(2)); // Rounded to 2 decimal places
    const donationPercentage = parseFloat(((user.NumDon / totalRequests) * 100).toFixed(2)); // Rounded to 2 decimal places

    return [
      {
        name: "Request",
        value: requestPercentage,
        fill: "#82ca9d", // Green for requests
      },
      {
        name: "Donation",
        value: donationPercentage,
        fill: "#8884d8", // Blue for donations
      },
    ];
  }

  // Default data if user is not found
  return [
    {
      name: "Request",
      value: 50,
      fill: "#82ca9d",
    },
    {
      name: "Donation",
      value: 50,
      fill: "#8884d8",
    },
  ];
};

const Performance = ({ userId }: { userId: number }) => {
  const performanceData = calculatePerformanceData(userId);

  return (
    <div className="bg-white rounded-md p-4 relative h-80">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold p-4">Performance</h1>
        <Image src="/moreDark.png" alt="details" width={16} height={16} />
      </div>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={performanceData}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="50%"
            innerRadius={70}
          />
        </PieChart>
      </ResponsiveContainer>
        
      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{performanceData[0].value}%</h1>
          <p className="text-xs text-gray-300">Ratio</p>
        </div>
        <h2 className="font-medium absolute bottom-16 right-0 left-0 m-auto text-center">
          1st Quarter Donations
        </h2>
      </div>
    </div>
  );
};

export default Performance;
