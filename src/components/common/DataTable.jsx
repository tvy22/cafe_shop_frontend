import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  totalEntries = 0,
  currentPage = 1,
  pageSize = 6,
  onPageChange = () => {},
}) {
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card border border-cream/80 flex flex-col justify-between">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-cream/80 text-meta font-bold uppercase tracking-wider text-coffee/60">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`pb-4 px-3 ${col.align === "right" ? "text-right" : ""}`}
                  style={{ width: col.width || "auto" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/40 text-body">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className="hover:bg-milk/30 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-3 align-middle ${
                        col.align === "right" ? "text-right" : ""
                      }`}
                    >
                      {/* Render custom cell content if specified, or standard object field */}
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-coffee/60 font-medium"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-6 pt-4 border-t border-cream/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-meta font-medium text-coffee/60">
          Showing {data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex size-8 items-center justify-center rounded-lg border border-cream/80 bg-white text-coffee hover:bg-cream/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`flex size-8 items-center justify-center rounded-lg text-body font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-matcha text-coffee shadow-xs"
                    : "border border-cream/80 bg-white text-coffee/70 hover:bg-cream/30"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex size-8 items-center justify-center rounded-lg border border-cream/80 bg-white text-coffee hover:bg-cream/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}