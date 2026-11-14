import React from "react";
import { orders } from "../../../../data/recentOrders";

export default function RecentOrders() {

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card border border-cream/80">
      <h2 className="text-h2 font-bold text-coffee mb-6">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-cream/80 text-meta font-bold uppercase tracking-wider text-coffee/60">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer Name</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Total</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/40 text-body">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-cream/10 transition-colors">
                <td className="py-3.5 font-bold text-coffee">{order.id}</td>
                <td className="py-3.5 font-semibold text-coffee/90">
                  {order.customer}
                </td>
                <td className="py-3.5 text-coffee/70 font-medium truncate">
                  {order.items}
                </td>
                <td className="py-3.5 font-bold text-caramel">{order.total}</td>
                <td className="py-3.5 text-right">
                  <span
                    className={`inline-block rounded-pill px-3.5 py-1 text-xs font-bold ${order.statusStyle}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}