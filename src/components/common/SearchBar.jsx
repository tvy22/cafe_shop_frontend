import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full sm:w-80 md:w-70 ${className}`}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/50 pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-pill border border-cream/80 bg-white py-2.5 pl-11 pr-5 text-body font-medium text-coffee placeholder:text-coffee/40 focus:outline-none focus:border-caramel shadow-xs"
      />
    </div>
  );
}