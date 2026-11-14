import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryItems } from "../../data/categoryItems";
import Modal from "../../components/common/Modal";

export default function CategoryManagement() {
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter categories based on search input
  const filteredCategories = categoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <Link
            to={`/dashboard/categories/edit/${row.id}`}
            type="button"
            className="p-1.5 hover:text-coffee hover:bg-cream/40 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 size={16} />
          </Link>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
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
          <Link
            to="/dashboard/categories/add"
            type="button"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-bold text-coffee shadow-xs hover:bg-matcha/80 transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </Link>

        </div>

        {/* Reusable Data Table */}
        <DataTable
          columns={columns}
          data={filteredCategories}
          totalEntries={filteredCategories.length}
          currentPage={1}
          pageSize={6}
          onPageChange={(page) => console.log("Navigate to page:", page)}
        />

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
        >
          <p className="text-body text-coffee/80">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
  
          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-pill border border-cream bg-white px-4 py-2 text-body font-medium text-coffee transition-colors hover:bg-milk cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-pill bg-red-500 px-4 py-2 text-body font-semibold text-white transition-colors hover:bg-red-600 cursor-pointer shadow-xs"
            >
              Yes, Delete
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}