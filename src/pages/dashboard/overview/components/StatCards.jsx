import React from "react";
import { DollarSign, Coffee, CheckCircle2, TrendingUp } from "lucide-react";

export default function StatCards() {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$2,847",
      subtext: "+12.4% from yesterday",
      icon: DollarSign,
      iconBg: "bg-matcha text-coffee",
    },
    {
      title: "Active Orders",
      value: "12",
      subtext: "5 preparing, 7 incoming",
      icon: Coffee,
      iconBg: "bg-caramel/20 text-coffee",
    },
    {
      title: "Total Drinks Sold",
      value: "186",
      subtext: "Matcha Latte is top choice",
      icon: CheckCircle2,
      iconBg: "bg-matcha/50 text-coffee",
    },
    {
      title: "Avg Order Value",
      value: "$15.30",
      subtext: "+4.2% vs last week",
      icon: TrendingUp,
      iconBg: "bg-caramel text-milk",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="flex flex-col justify-between rounded-3xl bg-white p-5 shadow-card border border-cream/80"
          >
            <div className="flex items-start justify-between">
              <span className="text-meta font-semibold text-coffee/70">
                {stat.title}
              </span>
              <div
                className={`flex size-9 items-center justify-center rounded-full ${stat.iconBg} shadow-xs`}
              >
                <Icon size={18} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-h1 lg:text-h2 font-bold text-coffee">{stat.value}</h2>
              <p className="mt-1 text-meta font-medium text-caramel">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}