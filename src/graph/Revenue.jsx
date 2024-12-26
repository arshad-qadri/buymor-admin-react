import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 20000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 30000 },
  { month: "Jul", revenue: 28000 },
  { month: "Aug", revenue: 32000 },
  { month: "Sep", revenue: 35000 },
  { month: "Oct", revenue: 37000 },
  { month: "Nov", revenue: 40000 },
  { month: "Dec", revenue: 42000 },
];

const YearlyRevenue = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={170}
      className="bg-white shadow rounded-lg py-2 pr-2"
    >
      <LineChart data={revenueData}>
        {/* Revenue Line */}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />

        {/* Axes */}
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />

        {/* Tooltip */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyRevenue;
