import React from "react";
import { DollarSign, TrendingUp, ShoppingBag, Award } from "lucide-react";

export default function ReportStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$42,580",
      subtitle: "Aug 1 – Aug 16, 2026",
      icon: DollarSign,
      iconBg: "bg-matcha text-coffee",
    },
    {
      title: "Net Earnings",
      value: "$31,935",
      subtitle: "75% Profit margin",
      icon: TrendingUp,
      iconBg: "bg-caramel/20 text-caramel",
    },
    {
      title: "Total Orders",
      value: "2,847",
      subtitle: "Avg 178 orders/day",
      icon: ShoppingBag,
      iconBg: "bg-matcha/50 text-coffee",
    },
    {
      title: "Avg Order Value",
      value: "$14.95",
      subtitle: "+1.5% from last month",
      icon: Award,
      iconBg: "bg-caramel text-milk",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-card border border-cream/80"
          >
            <div className="flex items-start justify-between">
              <span className="text-meta font-semibold text-coffee/70">
                {item.title}
              </span>
              <div
                className={`flex size-9 items-center justify-center rounded-full ${item.iconBg} shadow-xs`}
              >
                <Icon size={18} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-h1 lg:text-h2 font-bold text-coffee">{item.value}</h2>
              <p className="mt-1 text-meta font-medium text-caramel">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}