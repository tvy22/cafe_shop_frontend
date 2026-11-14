import { useState, useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import SlideDrawer from "../../components/common/SlideDrawer";
import OrderReceipt from "../../components/order/OrderReceipt";
import { Eye, Ban } from "lucide-react";
import { orderItems as orderData } from "../../data/orderItems";

export default function OrderManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filterOptions = [
    "All Orders",
    "Completed",
    "Preparing",
    "Cancelled",
    "Dine-in",
    "Takeaway",
  ];

  const [orderItems, setOrderItems] = useState(orderData);

  const handleVoidOrder = (orderId) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: "Cancelled" } : item
      )
    );
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: "Cancelled" }));
    }
  };

  const filteredData = useMemo(() => {
    return orderItems.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All Orders" ||
        order.status === filter ||
        order.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, orderItems]);

  const columns = useMemo(() => [
    {
      header: "ORDER ID",
      accessor: "id",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.id}</span>
      ),
    },
    {
      header: "CUSTOMER",
      accessor: "customer",
      render: (row) => (
        <span className="font-medium text-coffee text-body">{row.customer}</span>
      ),
    },
    {
      header: "TYPE",
      accessor: "type",
      render: (row) => (
        <span className="text-coffee/80 text-body">{row.type}</span>
      ),
    },
    {
      header: "PAYMENT",
      accessor: "payment",
      render: (row) => (
        <span className="text-coffee/80 text-body">{row.payment}</span>
      ),
    },
    {
      header: "TOTAL",
      accessor: "total",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.total}</span>
      ),
    },
    {
      header: "STATUS",
      render: (row) => {
        const statusStyles = {
          Completed: "bg-matcha text-coffee",
          Preparing: "bg-caramel/20 text-caramel",
          Cancelled: "bg-cream/80 text-coffee/50",
        };

        return (
          <span
            className={`inline-block rounded-pill px-3.5 py-1 text-xs font-bold ${
              statusStyles[row.status] || "bg-cream/80 text-coffee"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "ACTIONS",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2 text-coffee/70">
          <button
            type="button"
            onClick={() => setSelectedOrder(row)}
            className="p-1.5 hover:text-coffee hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
            title="View Order Details"
          >
            <Eye size={16} />
          </button>
          
          {row.status !== "Cancelled" && (
            <button
              type="button"
              onClick={() => handleVoidOrder(row.id)}
              className="p-1.5 hover:text-caramel hover:bg-caramel/10 rounded-lg transition-colors cursor-pointer"
              title="Void / Cancel Order"
            >
              <Ban size={14} />
            </button>
          )}
        </div>
      ),
    },
  ], []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by Order ID or Customer..."
            />

            <CategoryFilter
              value={filter}
              onChange={setFilter}
              options={filterOptions}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          totalEntries={filteredData.length}
          currentPage={1}
          pageSize={6}
          onPageChange={(page) => console.log("Navigate to page:", page)}
        />

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