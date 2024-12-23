"use client"

// import { Legend } from "chart.js"
import { RadialBarChart, ResponsiveContainer,RadialBar , Legend} from "recharts"
import Image from "next/image"

const data = [
    {
        name: 'Total',
        count: 6200,
        fill: 'white'
    },
    {
        name: 'subscribers',
        count: 5000,
        fill: '#22c55e'
    },
    {
        name: 'guests',
        count: 1200,
        fill: '#ef4444'
    },
]

const CountChart = () => {
  return(
    <div className="bg-white shadow-md rounded-xl w-full h-full p-4">
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Users</h1>
            <Image src="/moreDark.png" alt="users" width={20} height={20} />
        </div>
        {/* CHART */}
        <div className="w-full h-[75%] relative">
            <ResponsiveContainer >
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                <RadialBar
            
                 background 
                 dataKey="count"
                 />
                {/* <Legend iconSize={10}  verticalAlign="middle" layout="vertical" /> */}
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src="/user-guests.jpg" alt="" width={65} height={65}  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        </div>
        {/* BOTTOM */}
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-green-500 rounded-full"/>
                <h1 className="font-bold">5000 </h1>
                <h2 className="text-xs text-gray-500">Subscribed (60%)</h2>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-red-500 rounded-full" />
                <h1 className="font-bold">1200</h1>
                <h2 className="text-xs text-gray-500">Guests (40%)</h2>
            
            </div>
            
        </div>

    </div>



  )}

export default CountChart