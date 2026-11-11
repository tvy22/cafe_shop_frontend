import React from "react";
import DashboardLayout from "./DashboardLayout";
import StatCards from "./overview/components/StatCards";
import SalesChart from "./overview/components/SalesChart";
import TopDrinks from "./overview/components/TopDrinks";
import RecentOrders from "./overview/components/RecentOrders";

export default function Dashboard() {
    return (
        <DashboardLayout activeTab="Dashboard">
            <div className="space-y-8">
                
                {/* Summary Cards */}
                <StatCards/>

                {/* Middle Row: Chart & Top Selling Drinks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2">
                        <SalesChart/>
                    </div>
                    <div className="lg:col-span-1">
                        <TopDrinks/>
                    </div>
                </div>

                {/* Bottom Row: Recent Orders */}
                <RecentOrders/>

            </div>
        </DashboardLayout>
    )
}