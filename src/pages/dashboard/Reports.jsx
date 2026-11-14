import React from "react";
import DashboardLayout from "./DashboardLayout";
import ReportStats from "./reports/components/ReportStats";
import RevenueByCategory from "./reports/components/RevenueByCategory";
import PeakSalesHours from "./reports/components/PeakSalesHours";
import MonthlyRevenueTrend from "./reports/components/MonthlyRevenueTrend";
import { Calendar, Download } from "lucide-react";

export default function Reports() {
  return (
    <DashboardLayout activeTab="Reports">
      <div className="space-y-6">
        
        {/* Top Header Actions: Date Range & Exports */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 rounded-pill bg-white px-4 py-2.5 shadow-card border border-cream/80 w-fit">
            <Calendar size={16} className="text-caramel" />
            <span className="text-body font-semibold text-coffee">Aug 1 – Aug 16, 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-pill bg-white px-5 py-2.5 text-body font-semibold text-coffee shadow-card border border-cream/80 transition-all hover:bg-milk cursor-pointer"
            >
              <Download size={16} className="text-caramel" />
              Export CSV
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-pill bg-matcha px-5 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 cursor-pointer"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Row 1: Key Performance Metrics Cards */}
        <ReportStats />

        {/* Row 2: Category Breakdown & Peak Hours (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <RevenueByCategory />
          </div>
          <div className="lg:col-span-1">
            <PeakSalesHours />
          </div>
        </div>

        {/* Row 3: Monthly Trend Chart */}
        <MonthlyRevenueTrend />

      </div>
    </DashboardLayout>
  );
}