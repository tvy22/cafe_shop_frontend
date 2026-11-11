import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import { Plus, Edit3, Trash2 } from "lucide-react";

export default function CategoryManagement() {
  const [search, setSearch] = useState("");

  const categoryItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=150&q=80",
      name: "Espresso & Hot Coffee",
      description: "Rich, robust artisanal hot espresso bl...",
      items: 12,
      status: "Active",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=150&q=80",
      name: "Cold Brew & Iced",
      description: "Slow-steeped cold single origins and...",
      items: 8,
      status: "Active",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=150&q=80",
      name: "Teas & Matchas",
      description: "Ceremonial stone-ground matchas a...",
      items: 14,
      status: "Active",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=150&q=80",
      name: "Specialty Latte",
      description: "Signature lavender, caramel, and bot...",
      items: 6,
      status: "Active",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=150&q=80",
      name: "Smoothies",
      description: "Fresh tropical fruit and dairy-free cre...",
      items: 9,
      status: "Active",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80",
      name: "Seasonal Specials",
      description: "Curated flavors capturing Cambodia...",
      items: 4,
      status: "Inactive",
    },
  ];

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
      header: "CATEGORY NAME",
      accessor: "name",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.name}</span>
      ),
    },
    // {
    //   header: "DESCRIPTION",
    //   accessor: "description",
    //   render: (row) => (
    //     <span className="font-medium text-coffee/70 text-body line-clamp-1">
    //       {row.description}
    //     </span>
    //   ),
    // },
    {
      header: "LINKED ITEMS",
      accessor: "items",
      render: (row) => (
        <span className="font-bold text-coffee/80 text-body">
          {row.items} drinks
        </span>
      ),
    },
    {
      header: "STATUS",
      render: (row) => {
        const isActive = row.status === "Active";
        return (
          <span
            className={`inline-block rounded-pill px-3.5 py-1 text-xs font-bold ${
              isActive
                ? "bg-matcha text-coffee"
                : "bg-cream/80 text-coffee/50"
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
    <DashboardLayout title="Category Management">
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          
          {/* Search Input */}
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
          />

          {/* Add Button */}
          <button
            type="button"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-bold text-coffee shadow-xs hover:bg-matcha/80 transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </button>

        </div>

        {/* Reusable Data Table */}
        <DataTable
          columns={columns}
          data={categoryItems}
          totalEntries={6}
          currentPage={1}
          pageSize={6}
          onPageChange={(page) => console.log("Navigate to page:", page)}
        />
      </div>
    </DashboardLayout>
  );
}