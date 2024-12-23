"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/data/BloodReqSupData";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles

const OverallChart = () => {
    const [filterLevel, setFilterLevel] = useState("month"); // Default filter level
    const [startDate, setStartDate] = useState<Date | undefined>(undefined); // Changed to Date | undefined
    const [endDate, setEndDate] = useState<Date | undefined>(undefined); // Changed to Date | undefined
    const [earliestDate, setEarliestDate] = useState<Date | undefined>(undefined); // Changed to Date | undefined
    const [latestDate, setLatestDate] = useState<Date | undefined>(undefined); // Changed to Date | undefined

    useEffect(() => {
        // Calculate the earliest and latest dates from the dataset
        const allDays = data.flatMap((month) =>
            month.weeks.flatMap((week) =>
                week.days.map((day) => new Date(day.date))
            )
        );
        const minDate = new Date(Math.min(...allDays.map(date => date.getTime())));
        const maxDate = new Date(Math.max(...allDays.map(date => date.getTime())));
        
        setEarliestDate(minDate);
        setLatestDate(maxDate);
    }, []);

    const getFilteredData = () => {
        switch (filterLevel) {
            case "month":
                return data.map((month) => ({
                    name: month.month,
                    userSupply: month.weeks.reduce(
                        (acc, week) =>
                            acc +
                            week.days.reduce((dAcc, day) => dAcc + day.userSupply, 0),
                        0
                    ),
                    guestSupply: month.weeks.reduce(
                        (acc, week) =>
                            acc +
                            week.days.reduce((dAcc, day) => dAcc + day.guestSupply, 0),
                        0
                    ),
                    userDemand: month.weeks.reduce(
                        (acc, week) =>
                            acc +
                            week.days.reduce((dAcc, day) => dAcc + day.userDemand, 0),
                        0
                    ),
                    guestDemand: month.weeks.reduce(
                        (acc, week) =>
                            acc +
                            week.days.reduce((dAcc, day) => dAcc + day.guestDemand, 0),
                        0
                    ),
                }));

            case "week":
                return data.flatMap((month) =>
                    month.weeks.map((week) => {
                        const filteredDays = week.days.filter((day) => {
                            const date = new Date(day.date);
                            return (
                                (!startDate || date >= startDate) &&
                                (!endDate || date <= endDate)
                            );
                        });

                        return {
                            name: week.week,
                            userSupply: filteredDays.reduce(
                                (acc, day) => acc + day.userSupply,
                                0
                            ),
                            guestSupply: filteredDays.reduce(
                                (acc, day) => acc + day.guestSupply,
                                0
                            ),
                            userDemand: filteredDays.reduce(
                                (acc, day) => acc + day.userDemand,
                                0
                            ),
                            guestDemand: filteredDays.reduce(
                                (acc, day) => acc + day.guestDemand,
                                0
                            ),
                        };
                    })
                );

            case "day":
                return data.flatMap((month) =>
                    month.weeks.flatMap((week) =>
                        week.days
                            .filter((day) => {
                                const date = new Date(day.date);
                                return (
                                    (!startDate || date >= startDate) &&
                                    (!endDate || date <= endDate)
                                );
                            })
                            .map((day) => ({
                                name: `${day.date}`, // Change this to any date format you prefer
                                userSupply: day.userSupply,
                                guestSupply: day.guestSupply,
                                userDemand: day.userDemand,
                                guestDemand: day.guestDemand,
                            }))
                    )
                );

            default:
                return [];
        }
    };

    const filteredData = getFilteredData();
    //console.log(filteredData);

    return (
        <div className="bg-white shadow-md rounded-xl w-full h-full p-4">
            {/* TITLE */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold p-4">Overall Supply/Demand </h1>
                <Image src="/moreDark.png" alt="users" width={20} height={20} />
            </div>
            <div>
                <div className="flex justify-between gap-2 pl-4 items-center">
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="bg-gray-100 rounded-lg border-1 p-1 border-gray-300 text-gray-500 text-sm focus:border-red-500 focus:ring-red-500 block  p-2.5"
                        >
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="day">Day</option>
                        </select>
                        {(filterLevel === "week" || filterLevel === "day") && (
                                <div className="flex justify-between gap-2 items-center">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date || undefined)} // Handle null to undefined
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={earliestDate} // Ensure minDate is handled properly
                                        maxDate={latestDate} // Ensure maxDate is handled properly
                                        placeholderText="Start Date"
                                        className="w-[90px] text-center rounded-md border-[1px] border-gray-300"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date || undefined)} // Handle null to undefined
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate || earliestDate} // Ensure minDate is handled properly
                                        maxDate={latestDate} // Ensure maxDate is handled properly
                                        placeholderText="End Date"
                                        className="w-[90px] text-center rounded-md border-[1px] border-gray-300"
                                    />
                                </div>
                            
                        )}
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickMargin={10}
                            tick={{ fill: "#d1d5db" }}
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={20}
                            tick={{ fill: "#d1d5db" }}
                        />
                        <Tooltip />
                        <Legend
                            align="center"
                            verticalAlign="top"
                            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
                        />
                        <Line type="monotone" dataKey="userSupply" stroke="#8884d8" strokeWidth={5} />
                        <Line type="monotone" dataKey="guestSupply" stroke="#82ca9d" strokeWidth={5} />
                        <Line type="monotone" dataKey="userDemand" stroke="#ff7300" strokeWidth={5} />
                        <Line type="monotone" dataKey="guestDemand" stroke="#ff0000" strokeWidth={5} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverallChart;
