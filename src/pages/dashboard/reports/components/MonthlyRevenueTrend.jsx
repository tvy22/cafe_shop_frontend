import React from "react";

export default function MonthlyRevenueTrend() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card border border-cream/80">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-bold text-coffee">Monthly Revenue Trend</h3>
        <span className="text-meta font-semibold text-caramel cursor-pointer hover:underline">
          6-Month Overview
        </span>
      </div>

      {/* Visual Line Graph Representation */}
      <div className="relative h-48 w-full flex items-end justify-between px-4 pt-6 pb-2">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-cream/60 w-full" />
          <div className="border-b border-cream/60 w-full" />
          <div className="border-b border-cream/60 w-full" />
        </div>

        {/* SVG Line Chart Graphic */}
        <div className="absolute inset-x-8 inset-y-6 flex items-center pointer-events-none">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 120">
            <path
              d="M 10 100 Q 110 90, 210 105 T 410 40 T 580 55"
              fill="none"
              stroke="#ABBF9B"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Graph Nodes (Months) */}
        {[
          { month: "Mar", pos: "15%" },
          { month: "Apr", pos: "35%" },
          { month: "May", pos: "55%" },
          { month: "Jun", pos: "70%" },
          { month: "Jul", pos: "85%" },
          { month: "Aug", pos: "95%" },
        ].map((item, index) => (
          <div key={index} className="z-10 flex flex-col items-center gap-2">
            <div className="size-2.5 rounded-full bg-coffee border-2 border-white shadow-xs" />
            <span className="text-meta font-medium text-coffee/60">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}