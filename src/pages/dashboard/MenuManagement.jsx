import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import { Plus, Search, Edit3, Trash2, ChevronDown } from "lucide-react";

export default function MenuManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const categoryOptions = [
    "All Categories",
    "Teas & Matchas",
    "Cold Brew & Iced",
    "Espresso & Hot Coffee",
    "Speciality Coffee",
  ]

  const menuItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=150&q=80",
      name: "Matcha Cloud Latte",
      category: "Teas & Matchas",
      price: "$5.75",
      status: "Available",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=150&q=80",
      name: "Caramel Cold Brew",
      category: "Cold Brew & Iced",
      price: "$4.50",
      status: "Available",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=150&q=80",
      name: "Classic Flat White",
      category: "Espresso & Hot Coffee",
      price: "$4.25",
      status: "Available",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=150&q=80",
      name: "Iced Lavender Latte",
      category: "Specialty Latte",
      price: "$5.25",
      status: "Available",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80",
      name: "Espresso Tonic",
      category: "Cold Brew & Iced",
      price: "$4.75",
      status: "Unavailable",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=150&q=80",
      name: "Ceremonial Hot Matcha",
      category: "Teas & Matchas",
      price: "$5.00",
      status: "Available",
    },
  ];

  // Defining Menu specific columns
  const columns = [
    {
      header: "IMAGE",
      width: "80px",
      render: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="size-11 rounded-xl object-cover border border-cream/80"
        />
      ),
    },
    {
      header: "NAME",
      accessor: "name",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.name}</span>
      ),
    },
    {
      header: "CATEGORY",
      accessor: "category",
      render: (row) => (
        <span className="font-medium text-coffee/70 text-body">{row.category}</span>
      ),
    },
    {
      header: "PRICE",
      accessor: "price",
      render: (row) => (
        <span className="font-bold text-caramel text-body">{row.price}</span>
      ),
    },
    {
      header: "STATUS",
      render: (row) => {
        const isAvailable = row.status === "Available";
        return (
          <span
            className={`inline-block rounded-pill px-3.5 py-1 text-xs font-bold ${
              isAvailable
                ? "bg-matcha text-coffee"
                : "bg-caramel/20 text-caramel"
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
            className="p-1.5 hover:text-coffee hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="p-1.5 hover:text-caramel hover:bg-caramel/10 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Menu Management">
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          
          {/* Group Search + Category on Desktop (Left Aligned), Stacked on Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            
            {/* Search Input */}
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search drinks..."
            />

            {/* Reusable Headless UI Category Filter */}
            <CategoryFilter
                value={category}
                onChange={setCategory}
                options={categoryOptions}
                className="w-full"
            />

          </div>

          {/* Add Button (Far Right on Desktop, 3rd Row on Mobile) */}
          <button
            type="button"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-bold text-coffee shadow-xs hover:bg-matcha/80 transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} />
            <span>Add New Drink</span>
          </button>

        </div>

        {/* Reusable Data Table */}
        <DataTable
          columns={columns}
          data={menuItems}
          totalEntries={18}
          currentPage={1}
          pageSize={6}
          onPageChange={(page) => console.log("Navigate to page:", page)}
        />
      </div>
    </DashboardLayout>
  );
}