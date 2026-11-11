import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", sales: 1100 },
  { day: "Tue", sales: 1650 },
  { day: "Wed", sales: 1350 },
  { day: "Thu", sales: 2200 },
  { day: "Fri", sales: 1950 },
  { day: "Sat", sales: 2550 },
  { day: "Sun", sales: 2400 },
];

export default function SalesChart() {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-card border border-cream/80 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-h2 font-bold text-coffee">Daily Sales Performance</h2>
        <span className="text-meta font-semibold text-caramel">
          This Week <span className="text-coffee/50">(USD)</span>
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8C7A6B", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8C7A6B", fontSize: 12 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFF",
                borderRadius: "12px",
                borderColor: "#E5E0D8",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                color: "#3D2B1F",
                fontWeight: "bold",
              }}
              formatter={(value) => [`$${value}`, "Sales"]}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#A8C3A0"
              strokeWidth={3}
              dot={{ fill: "#3D2B1F", r: 4, strokeWidth: 2, stroke: "#A8C3A0" }}
              activeDot={{ r: 6, fill: "#3D2B1F" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}