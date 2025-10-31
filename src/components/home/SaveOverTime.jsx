"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const SaveOverTime = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 768);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chart data for monthly savings
  const chartData = [
    { month: "Jan", value: 170 },
    { month: "Feb", value: 100 },
    { month: "Mar", value: 130 },
    { month: "Apr", value: 220 },
    { month: "May", value: 100 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 90 },
    { month: "Aug", value: 60 },
    { month: "Sep", value: 110 },
    { month: "Oct", value: 80 },
  ];

  return (
    <div
      className="rounded-2xl py-6 sm:py-8 md:py-12 border border-neutral-600"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      {/* Header */}
      <div className="flex items-center mb-4 sm:mb-6 ml-4 sm:ml-6 md:ml-8 px-2 sm:px-0">
        <div className="w-4 h-2 sm:w-6 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
        <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl">
          Your savings over time
        </h3>
      </div>

      {/* Chart Container */}
      <div className="h-48 sm:h-64 md:h-80 lg:h-full w-full px-2 sm:px-4 md:px-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? 1 : 0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: isMobile ? 10 : 12 }}
              domain={[0, 250]}
              ticks={isMobile ? [0, 100, 200] : [0, 50, 100, 150, 200, 250]}
              width={isMobile ? 30 : 40}
            />
            <Bar dataKey="value" fill="#017FF4" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaveOverTime;
