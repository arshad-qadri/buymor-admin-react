import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 200 },
  { name: "Apr", sales: 278 },
  { name: "May", sales: 109 },
  { name: "Jun", sales: 239 },
  { name: "Jul", sales: 349 },
];

const TotalSale = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={250}
      
    >
      <LineChart data={data}>
        {/* Line Chart */}
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />

        {/* Remove CartesianGrid */}
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}

        {/* Axes */}
        <XAxis dataKey="name" tickLine={true} axisLine={false} />
        <YAxis tickLine={true} axisLine={false} />

        {/* Tooltip */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TotalSale;
