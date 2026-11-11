import React from "react";

export default function RecentOrders() {
  const orders = [
    {
      id: "#ORD-1045",
      customer: "Dara Serey",
      items: "1x Matcha Cloud Latte, 1x Butter Croissant",
      total: "$8.50",
      status: "Preparing",
      statusStyle: "bg-caramel/20 text-coffee",
    },
    {
      id: "#ORD-1044",
      customer: "Bopha Malis",
      items: "2x Caramel Cold Brew",
      total: "$9.00",
      status: "Completed",
      statusStyle: "bg-matcha text-coffee",
    },
    {
      id: "#ORD-1043",
      customer: "Sokha Roth",
      items: "1x Classic Flat White",
      total: "$4.25",
      status: "Incoming",
      statusStyle: "bg-cream text-coffee",
    },
    {
      id: "#ORD-1042",
      customer: "Narin Kun",
      items: "1x Iced Lavender Latte, 1x Matcha Cloud Latte",
      total: "$11.00",
      status: "Completed",
      statusStyle: "bg-matcha text-coffee",
    },
  ];

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
                <td className="py-3.5 text-coffee/70 font-medium max-w-xs truncate">
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