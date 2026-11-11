import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

export default function CategoryFilter({
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          
          {/* Main Button */}
          <Listbox.Button className="relative flex items-center justify-between w-full cursor-pointer rounded-pill border border-cream/80 bg-white py-2 pl-4 pr-3 text-left text-body font-bold text-coffee shadow-xs focus:outline-none focus:border-caramel transition-all">
            <span className="block truncate mr-2">{value}</span>
            <ChevronDown
              size={15}
              className="text-coffee/60 shrink-0 transition-transform duration-200"
            />
          </Listbox.Button>

          {/* Floating Dropdown Options Menu */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute right-0 z-50 mt-2 max-h-60 w-max min-w-full overflow-auto rounded-2xl bg-white p-2.5 space-y-1.5 text-body shadow-card border border-cream/80 focus:outline-none">
              {options.map((opt) => {
                const isHeader = opt === "Theme";

                return (
                  <Listbox.Option
                    key={opt}
                    value={opt}
                    disabled={isHeader}
                    className={({ active, selected }) =>
                      isHeader
                        ? "px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-coffee/40 cursor-default select-none border-b border-cream/50 mb-1"
                        : `relative cursor-pointer select-none rounded-xl py-2 pl-3.5 pr-8 transition-colors text-sm ${
                            active ? "bg-milk text-coffee font-bold" : "text-coffee/80"
                          } ${selected ? "bg-matcha/20 text-coffee font-bold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className="block whitespace-nowrap">{opt}</span>
                        {selected && !isHeader && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-coffee">
                            <Check size={16} />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>

        </div>
      </Listbox>
    </div>
  );
}