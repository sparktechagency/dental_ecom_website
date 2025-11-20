"use client";
import React, { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData = [
    { month: "Jan", value: 420 },
    { month: "Feb", value: 450 },
    { month: "Mar", value: 480 },
    { month: "Apr", value: 520 },
    { month: "May", value: 550 },
    { month: "Jun", value: 580 },
    { month: "Jul", value: 570 },
    { month: "Aug", value: 530 },
    { month: "Sep", value: 510 },
    { month: "Oct", value: 470 },
    { month: "Nov", value: 440 },
    { month: "Dec", value: 480 },
  ];

  return (
    <div className="rounded-2xl py-6 sm:py-8 md:py-12 border border-[#d3e4fd]">
      {/* Header */}
      <div className="flex items-center mb-4 sm:mb-6 ml-4 sm:ml-6 md:ml-8 px-2 sm:px-0">
        <FiDollarSign className="text-[#4a90e2] text-2xl mr-2" />
        <h3 className="font-semibold text-base sm:text-lg md:text-xl text-black">
          Monthly Cost Savings
        </h3>
      </div>

      {/* Chart */}
      <div className="h-48 sm:h-64 md:h-80 lg:h-full w-full px-2 sm:px-4 md:px-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#374151" opacity={0.3} />

            {/* Tooltip added */}
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#017FF4", fontWeight: "600" }}
            />

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
              domain={[0, 600]}
              ticks={isMobile ? [0, 100, 200] : [0, 150, 300, 450, 600]}
              width={isMobile ? 30 : 40}
            />

            {/* Bar radius updated */}
            <Bar
              dataKey="value"
              fill="#017FF4"
              radius={[8, 8, 0, 0]}  // smoother round top
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaveOverTime;
