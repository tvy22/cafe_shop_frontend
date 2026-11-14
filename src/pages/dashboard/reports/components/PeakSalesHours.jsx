import React from "react";

export default function PeakSalesHours() {
  const hours = [
    { time: "7 AM", count: 60, width: "35%" },
    { time: "9 AM", count: 140, width: "75%" },
    { time: "11 AM", count: 110, width: "60%" },
    { time: "1 PM", count: 95, width: "50%" },
    { time: "3 PM", count: 155, width: "85%" },
    { time: "5 PM", count: 120, width: "65%" },
    { time: "7 PM", count: 80, width: "45%" },
    { time: "9 PM", count: 35, width: "20%" },
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl bg-white p-6 shadow-card border border-cream/80">
      <h3 className="text-h3 font-bold text-coffee mb-6">Peak Sales Hours</h3>

      <div className="flex flex-col gap-4 justify-between flex-1">
        {hours.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="w-12 text-meta font-semibold text-coffee/70">
              {item.time}
            </span>

            {/* Custom Bar Fill */}
            <div className="flex-1 h-6 rounded-lg bg-milk overflow-hidden relative flex items-center px-3">
              <div
                className="absolute inset-y-0 left-0 bg-matcha/60 rounded-lg transition-all duration-500"
                style={{ width: item.width }}
              />
            </div>

            <span className="w-8 text-right text-meta font-bold text-coffee">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}