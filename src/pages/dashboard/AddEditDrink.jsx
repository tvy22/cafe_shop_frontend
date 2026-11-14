import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { ArrowLeft, Camera, Trash2, HelpCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddEditDrink() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "Matcha Cloud Latte",
    category: "Teas & Matchas",
    price: "5.75",
    status: "Available",
    description: "Smooth matcha with creamy milk and a cloud of foam.",
    stock: 100,
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80");

  const handleStockChange = (delta) => {
    setFormData((prev) => ({
      ...prev,
      stock: Math.max(0, prev.stock + delta),
    }));
  };

  return (
    <DashboardLayout activeTab="Menu">
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        
        {/* Top Navigation & Action Row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-pill bg-white px-4 py-2.5 text-body font-semibold text-coffee shadow-card border border-cream/80 transition-all hover:bg-milk cursor-pointer"
          >
            <ArrowLeft size={16} className="text-caramel" />
            Back to Menu
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-pill bg-matcha px-5 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 cursor-pointer"
          >
            <Check size={16} />
            Update Drink
          </button>
        </div>

        {/* Main Form Card Container */}
        <div className="rounded-3xl bg-white p-8 shadow-card border border-cream/80">
          
          {/* Card Header */}
          <div className="border-b border-cream/80 pb-4 mb-6">
            <h2 className="text-h2 font-bold text-coffee">Add New Drink</h2>
            <p className="text-body font-medium text-coffee/60 mt-0.5">
              Fill in the details below to add a new drink to your menu.
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
                <span className="text-body font-bold text-coffee">Upload Drink Image</span>
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
                    alt="Drink preview"
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
              
              {/* Drink Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">
                  Drink Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Matcha Cloud Latte"
                  className="w-full rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all cursor-pointer"
                  >
                    <option>Teas & Matchas</option>
                    <option>Espresso & Coffee</option>
                    <option>Cold Brew</option>
                    <option>Smoothies</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee/60">
                    ▼
                  </div>
                </div>
              </div>

              {/* Price & Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                  />
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
                      <option>Available</option>
                      <option>Out of Stock</option>
                      <option>Archived</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee/60">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-body font-semibold text-coffee">Description</label>
                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Write a brief description about the drink..."
                    className="w-full rounded-xl border border-cream bg-white p-4 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all resize-none"
                  />
                  <span className="absolute bottom-3 right-3 text-meta text-coffee/40">
                    {formData.description.length}/200
                  </span>
                </div>
              </div>

              {/* Stock Stepper & Featured Toggle Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
                
                {/* In Stock Stepper */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">In Stock</label>
                  <div className="flex items-center rounded-xl border border-cream bg-white p-1 shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleStockChange(-1)}
                      className="flex size-9 items-center justify-center rounded-lg bg-milk text-coffee hover:bg-cream/50 transition-colors cursor-pointer font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-body font-bold text-coffee">
                      {formData.stock}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStockChange(1)}
                      className="flex size-9 items-center justify-center rounded-lg bg-milk text-coffee hover:bg-cream/50 transition-colors cursor-pointer font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Featured Toggle Switch */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <label className="text-body font-semibold text-coffee">Featured Drink</label>
                    <HelpCircle size={14} className="text-coffee/40" />
                  </div>
                  <div className="flex items-center h-11 px-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-cream rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-cream after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-matcha"></div>
                    </label>
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
              <Check size={16} />
              Update Drink
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}