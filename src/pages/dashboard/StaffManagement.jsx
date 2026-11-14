import { useState, useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/common/CategoryFilter";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { staffItems } from "../../data/staffItems";
import Modal from "../../components/common/Modal";

export default function StaffManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Staff");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filterOptions = [
    "All Staff",
    "Baristas",
    "Managers",
    "Female",
    "Male",
    "Active",
    "Inactive",
  ];

  const filteredData = useMemo(() => {
    return staffItems.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()) ||
        staff.phone.includes(search);

      const matchesFilter =
        filter === "All Staff" ||
        staff.status === filter ||
        staff.gender === filter ||
        (filter === "Baristas" && staff.role === "Barista") ||
        (filter === "Managers" && staff.role === "Manager");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, staffItems]);

  const columns = useMemo(() => [
    {
      header: "IMAGE",
      width: "80px",
      render: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="size-11 rounded-xl object-cover border border-cream/80"
          />
        ) : (
          <div className="flex size-11 items-center justify-center rounded-xl border border-cream/80 bg-cream/40 text-lg font-bold text-coffee">
            {row.name.charAt(0)}
          </div>
        ),
    },
    {
      header: "STAFF NAME",
      accessor: "name",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.name}</span>
      ),
    },
    {
      header: "EMAIL",
      accessor: "email",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.email}</span>
      ),
    },
    {
      header: "GENDER",
      accessor: "gender",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.gender}</span>
      ),
    },
    {
      header: "PHONE",
      accessor: "phone",
      render: (row) => (
        <span className="font-bold text-coffee text-body">{row.phone}</span>
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
            to={`/dashboard/staff/edit/${row.id}`}
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
  ], []);

  return (
    <DashboardLayout title="Staff Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search staff..."
            />

            <CategoryFilter
              value={filter}
              onChange={setFilter}
              options={filterOptions}
              className="w-full sm:w-auto"
            />
          </div>

          <Link
            to="/dashboard/staff/add"
            type="button"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-bold text-coffee shadow-xs hover:bg-matcha/80 transition-colors cursor-pointer shrink-0"
          >
            <Plus size={18} />
            <span>Add New Staff</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          totalEntries={filteredData.length}
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
            Are you sure you want to delete this staff? This action cannot be undone.
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