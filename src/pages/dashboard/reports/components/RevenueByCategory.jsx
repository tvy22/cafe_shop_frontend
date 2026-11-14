import React from "react";

export default function RevenueByCategory() {
  const categories = [
    { name: "Espresso", amount: "$12400", percentage: 85, color: "bg-caramel" },
    { name: "Cold Brew", amount: "$9800", percentage: 70, color: "bg-caramel/80" },
    { name: "Matcha", amount: "$8200", percentage: 55, color: "bg-matcha" },
    { name: "Specialty Latte", amount: "$6500", percentage: 42, color: "bg-cream" },
    { name: "Teas", amount: "$3800", percentage: 25, color: "bg-matcha/60" },
    { name: "Smoothies", amount: "$1880", percentage: 15, color: "bg-cream/70" },
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl bg-white p-6 shadow-card border border-cream/80">
      <h3 className="text-h3 font-bold text-coffee mb-6">Revenue by Category</h3>

      <div className="flex flex-col gap-5 justify-between flex-1">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-body font-semibold">
              <span className="text-coffee">{cat.name}</span>
              <span className="text-coffee">{cat.amount}</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="h-3 w-full rounded-full bg-milk overflow-hidden">
              <div
                className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}