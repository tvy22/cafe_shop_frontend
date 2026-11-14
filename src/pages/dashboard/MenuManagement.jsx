import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { menuItems as menuData } from "../../data/menuItems"; 

export default function MenuManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  // Dynamically generate category options from menuData
  const categoryOptions = [
    "All Categories",
    ...new Set(menuData.map((item) => item.category)),
  ];

  // Map menuData items to match table column requirements
  const menuItems = menuData.map((item, index) => ({
    id: item.id || index + 1,
    image: item.image,
    name: item.name,
    category: item.category,
    price: typeof item.price === "number" ? `$${item.price.toFixed(2)}` : item.price,
    status: item.status || (index % 5 === 0 ? "Unavailable" : "Available"), // Fallback status
  }));

  // Filter items based on search query and category selection
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Categories" || item.category === category;
    return matchesSearch && matchesCategory;
  });

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
          <Link
            to={`/dashboard/menu/edit/${row.id}`}
            className="p-1.5 hover:text-coffee hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 size={16} />
          </Link>
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
          
          {/* Group Search + Category */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            
            {/* Search Input */}
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search drinks..."
            />

            {/* Category Filter */}
            <CategoryFilter
                value={category}
                onChange={setCategory}
                options={categoryOptions}
                className="w-full"
            />

          </div>

          {/* Add Button */}
          <Link
            to="/dashboard/menu/add"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-bold text-coffee shadow-xs hover:bg-matcha/80 transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} />
            <span>Add New Drink</span>
          </Link>

        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredItems}
          totalEntries={filteredItems.length}
          currentPage={1}
          pageSize={6}
          onPageChange={(page) => console.log("Navigate to page:", page)}
        />
      </div>
    </DashboardLayout>
  );
}