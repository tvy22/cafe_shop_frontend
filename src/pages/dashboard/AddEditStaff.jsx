import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { ArrowLeft, Camera, Trash2, Check, Plus, User, Mail, Phone, Briefcase } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { staffItems } from "../../data/staffItems"; 

export default function AddEditStaff() {
  const navigate = useNavigate();
  const { id } = useParams(); // Capture the dynamic ID if editing
  const isEditing = Boolean(id);

  // Form state for staff
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Select gender",
    phone: "",
    position: "Select position",
    status: "Active",
  });

  const [imagePreview, setImagePreview] = useState(null);

  // If editing, find the staff member from staffItems and pre-populate fields
  useEffect(() => {
    if (isEditing) {
      const staffToEdit = staffItems.find(
        (item) => String(item.id) === String(id)
      );

      if (staffToEdit) {
        setFormData({
          name: staffToEdit.name || "",
          email: staffToEdit.email || "",
          gender: staffToEdit.gender || "Select gender",
          phone: staffToEdit.phone || "",
          position: staffToEdit.position || "Select position",
          status: staffToEdit.status || "Active",
        });
        setImagePreview(staffToEdit.image || null);
      }
    }
  }, [id, isEditing]);

  return (
    <DashboardLayout activeTab="Staff">
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        
        {/* Top Navigation & Action Row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-pill bg-white px-4 py-2.5 text-body font-semibold text-coffee shadow-card border border-cream/80 transition-all hover:bg-milk cursor-pointer"
          >
            <ArrowLeft size={16} className="text-caramel" />
            Back to Staff
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-pill bg-matcha px-5 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 cursor-pointer"
          >
            {isEditing ? <Check size={16} /> : <Plus size={16} />}
            {isEditing ? "Update Staff" : "Save Staff"}
          </button>
        </div>

        {/* Main Form Card Container */}
        <div className="rounded-3xl bg-white p-8 shadow-card border border-cream/80">
          
          {/* Card Header */}
          <div className="border-b border-cream/80 pb-4 mb-6">
            <h2 className="text-h2 font-bold text-coffee">
              {isEditing ? "Edit Staff" : "Add New Staff"}
            </h2>
            <p className="text-body font-medium text-coffee/60 mt-0.5">
              {isEditing
                ? "Update the staff details below."
                : "Fill in the staff details below."}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Uploader & Preview Box */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Upload Dashed Box */}
              <label className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cream bg-milk/50 p-6 text-center cursor-pointer hover:bg-milk transition-colors h-52">
                <div className="flex size-12 items-center justify-center rounded-full bg-white text-caramel shadow-xs mb-3">
                  <Camera size={22} />
                </div>
                <span className="text-body font-bold text-coffee">
                  {isEditing ? "Change Staff Photo" : "Upload Staff Photo"}
                </span>
                <span className="text-meta font-medium text-coffee/60 mt-1">
                  Click to upload or drag and drop
                </span>
                <span className="text-meta text-coffee/40 mt-0.5">JPG, PNG (Max 5MB)</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>

              {/* Uploaded Image Preview Box with Delete Action */}
              {imagePreview && (
                <div className="relative rounded-3xl overflow-hidden border border-cream/80 shadow-xs h-56">
                  <img
                    src={imagePreview}
                    alt="Staff preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-card hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Input Fields */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User size={18} className="absolute left-4 text-coffee/40 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter staff full name"
                    className="w-full rounded-xl border border-cream bg-white pl-11 pr-4 py-2.5 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-4 text-coffee/40 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-cream bg-white pl-11 pr-4 py-2.5 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                  />
                </div>
              </div>

              {/* Gender & Phone Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">Gender</label>
                  <div className="relative flex items-center">
                    <User size={18} className="absolute left-4 text-coffee/40 pointer-events-none" />
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-cream bg-white pl-11 pr-10 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all cursor-pointer"
                    >
                      <option disabled>Select gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-4 pointer-events-none text-coffee/60">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone size={18} className="absolute left-4 text-coffee/40 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-cream bg-white pl-11 pr-4 py-2.5 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Position */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">Position</label>
                <div className="relative flex items-center">
                  <Briefcase size={18} className="absolute left-4 text-coffee/40 pointer-events-none" />
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-cream bg-white pl-11 pr-10 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all cursor-pointer"
                  >
                    <option disabled>Select position</option>
                    <option>Store Manager</option>
                    <option>Senior Barista</option>
                    <option>Cashier</option>
                    <option>Staff Barista</option>
                  </select>
                  <div className="absolute right-4 pointer-events-none text-coffee/60">
                    ▼
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all cursor-pointer"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>On Leave</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee/60">
                    ▼
                  </div>
                </div>
              </div>

            </div>

          </form>

          {/* Form Bottom Action Buttons */}
          <div className="border-t border-cream/80 mt-8 pt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-pill border border-cream bg-white px-6 py-2.5 text-body font-medium text-coffee transition-colors hover:bg-milk cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 cursor-pointer"
            >
              {isEditing ? <Check size={16} /> : <Plus size={16} />}
              {isEditing ? "Update Staff" : "Save Staff"}
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}