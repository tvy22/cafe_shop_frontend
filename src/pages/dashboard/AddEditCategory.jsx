import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { ArrowLeft, Camera, Trash2, Check, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../../services/categoryService";

export default function AddEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load existing category data when editing
  useEffect(() => {
    if (!isEditing) {
      setIsLoading(false);
      return;
    }

    let active = true;

    async function fetchCategory() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await categoryService.getById(id);
        const category = res.data?.data ?? res.data;

        if (active && category) {
          setFormData({
            name: category.name || "",
            description: category.description || "",
            status: category.status || "Active",
          });
          setImagePreview(category.image || null);
          setImageFile(null);
        }
      } catch (err) {
        if (active) {
          setErrorMessage(
            err.response?.data?.message || "Failed to load category details."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchCategory();

    return () => {
      active = false;
    };
  }, [id, isEditing]);

  // Clean up object URLs when unmounting or changing previews
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Matches your current CategoryController fields (name, image)
      // Include imageFile if a new file was picked, or existing imagePreview if unchanged
      const payload = {
        name: formData.name.trim(),
        image: imageFile || imagePreview || null,
      };

      if (isEditing) {
        await categoryService.update(id, payload);
      } else {
        await categoryService.create(payload);
      }

      navigate(-1);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      const firstValidationError = validationErrors
        ? Object.values(validationErrors).flat()[0]
        : null;

      setErrorMessage(
        firstValidationError ||
          err.response?.data?.message ||
          "Something went wrong while saving the category."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Category Management">
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        {/* Top Navigation & Action Row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-pill bg-white px-4 py-2.5 text-body font-semibold text-coffee shadow-card border border-cream/80 transition-all hover:bg-milk cursor-pointer"
          >
            <ArrowLeft size={16} className="text-caramel" />
            Back to Categories
          </button>

          <button
            type="submit"
            form="category-form"
            disabled={isSubmitting || isLoading}
            className="flex items-center gap-2 rounded-pill bg-matcha px-5 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 disabled:opacity-60 cursor-pointer"
          >
            {isEditing ? <Check size={16} /> : <Plus size={16} />}
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
              ? "Update Category"
              : "Save Category"}
          </button>
        </div>

        {/* Main Form Card Container */}
        <div className="rounded-3xl bg-white p-8 shadow-card border border-cream/80">
          {/* Card Header */}
          <div className="border-b border-cream/80 pb-4 mb-6">
            <h2 className="text-h2 font-bold text-coffee">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h2>
            <p className="text-body font-medium text-coffee/60 mt-0.5">
              {isEditing
                ? "Update the category details below."
                : "Fill in the details below to add a new category to your menu."}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <div className="py-12 text-center text-body font-medium text-coffee/60">
              Loading category details...
            </div>
          ) : (
            <form
              id="category-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Image Uploader & Preview Box */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <label className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cream bg-milk/50 p-6 text-center cursor-pointer hover:bg-milk transition-colors h-52">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white text-caramel shadow-xs mb-3">
                    <Camera size={22} />
                  </div>
                  <span className="text-body font-bold text-coffee">
                    {isEditing ? "Change Category Image" : "Upload Category Image"}
                  </span>
                  <span className="text-meta font-medium text-coffee/60 mt-1">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-meta text-coffee/40 mt-0.5">
                    JPG, PNG, WEBP (Max 2MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleFileChange}
                  />
                </label>

                {imagePreview && (
                  <div className="relative rounded-3xl overflow-hidden border border-cream/80 shadow-xs h-56">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-card hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Input Fields */}
              <div className="lg:col-span-8 flex flex-col gap-5">
                {/* Category Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Coffee Drinks"
                    className="w-full rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      maxLength={200}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Write a brief description about the category..."
                      className="w-full rounded-xl border border-cream bg-white p-4 text-body text-coffee placeholder-coffee/40 focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all resize-none"
                    />
                    <span className="absolute bottom-3 right-3 text-meta text-coffee/40">
                      {formData.description.length}/200
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-body font-semibold text-coffee">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full appearance-none rounded-xl border border-cream bg-white px-4 py-2.5 text-body text-coffee focus:border-matcha focus:outline-none focus:ring-2 focus:ring-matcha/30 transition-all cursor-pointer"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-coffee/60">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

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
              type="submit"
              form="category-form"
              disabled={isSubmitting || isLoading}
              className="flex items-center gap-2 rounded-pill bg-matcha px-6 py-2.5 text-body font-semibold text-coffee shadow-card transition-all hover:bg-matcha/80 disabled:opacity-60 cursor-pointer"
            >
              {isEditing ? <Check size={16} /> : <Plus size={16} />}
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Category"
                : "Save Category"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}