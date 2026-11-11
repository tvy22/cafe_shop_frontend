import { useState, useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import SlideDrawer from "../../components/common/SlideDrawer";
import OrderReceipt from "../../components/order/OrderReceipt";
import StatusColumn from "../../components/live-order/StatusColumn";

const INITIAL_ORDERS = [
  {
    id: "RUPP-2485",
    customer: "Liam Brooks",
    type: "Takeaway",
    payment: "KHQR",
    status: "Incoming",
    total: "$11.40",
    elapsedMinutes: 3,
    createdAt: "10:42 AM",
    items: [
      { name: "Travertine Cold Brew", qty: 1, price: "$4.50", customizations: ["Less Ice", "Oat Milk"] },
      { name: "Butter Croissant", qty: 1, price: "$3.50", customizations: ["Warmed"] },
      { name: "Iced Latte", qty: 1, price: "$3.40", customizations: ["50% Sugar"] }
    ]
  },
  {
    id: "RUPP-2486",
    customer: "Sophia Vance",
    type: "Dine-in",
    table: "T-04",
    payment: "Cash",
    status: "Incoming",
    total: "$13.60",
    elapsedMinutes: 6,
    createdAt: "10:45 AM",
    items: [
      { name: "Pistachio Matcha Latte", qty: 2, price: "$6.80", customizations: ["Whole Milk"] }
    ]
  },
  {
    id: "RUPP-2483",
    customer: "Julian Finch",
    type: "Takeaway",
    payment: "KHQR",
    status: "Preparing",
    total: "$13.00",
    elapsedMinutes: 11,
    createdAt: "10:38 AM",
    items: [
      { name: "Caramel Cloud Macchiato", qty: 2, price: "$9.00", customizations: ["Extra Shot", "Oat Milk"] },
      { name: "Almond Croissant", qty: 1, price: "$4.00", customizations: [] }
    ]
  },
  {
    id: "RUPP-2482",
    customer: "Arthur Pendragon",
    type: "Dine-in",
    table: "T-02",
    payment: "KHQR",
    status: "Preparing",
    total: "$9.20",
    elapsedMinutes: 16,
    createdAt: "10:32 AM",
    items: [
      { name: "Chai Botanical Infusion", qty: 1, price: "$4.70", customizations: ["Hot"] },
      { name: "Custard Bun", qty: 1, price: "$4.50", customizations: [] }
    ]
  },
  {
    id: "RUPP-2480",
    customer: "Guinevere de Bois",
    type: "Dine-in",
    table: "T-08",
    payment: "KHQR",
    status: "Ready",
    total: "$6.50",
    elapsedMinutes: 24,
    createdAt: "10:24 AM",
    items: [
      { name: "Ceremonial Matcha Latte", qty: 1, price: "$6.50", customizations: ["Oat Milk", "No Sugar"] }
    ]
  },
  {
    id: "RUPP-2479",
    customer: "Lancelot du Lac",
    type: "Takeaway",
    payment: "Cash",
    status: "Ready",
    total: "$17.70",
    elapsedMinutes: 30,
    createdAt: "10:18 AM",
    items: [
      { name: "Travertine Cold Brew", qty: 3, price: "$13.50", customizations: ["Extra Shot"] },
      { name: "Chocolate Muffin", qty: 1, price: "$4.20", customizations: [] }
    ]
  }
];

const COLUMNS = [
  { key: "Incoming" },
  { key: "Preparing" },
  { key: "Ready" },
];

export default function LiveOrderQueue() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const typeFilterOptions = ["All Types", "Dine-in", "Takeaway"];

  const handleMoveStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleVoidOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: "Cancelled" } : null));
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (order.status === "Cancelled" || order.status === "Completed") return false;

      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));

      const matchesType =
        typeFilter === "All Types" || order.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [orders, search, typeFilter]);

  return (
    <DashboardLayout title="Live Order Queue">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-body text-coffee/60">
              Manage live kitchen preparation and pickup status in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search ID, customer, drink..."
            />
            <CategoryFilter
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeFilterOptions}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => (
            <StatusColumn
              key={col.key}
              statusKey={col.key}
              orders={filteredOrders.filter((o) => o.status === col.key)}
              onView={(order) => setSelectedOrder(order)}
              onMoveStatus={handleMoveStatus}
            />
          ))}
        </div>

        <SlideDrawer
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={selectedOrder ? `Order Details (${selectedOrder.id})` : ""}
        >
          <OrderReceipt
            order={selectedOrder}
            onVoidOrder={handleVoidOrder}
          />
        </SlideDrawer>
      </div>
    </DashboardLayout>
  );
}