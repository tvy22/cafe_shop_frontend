
import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        />

        {/* Modal Card Box */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            width: "min(448px, calc(100vw - 32px))",
            maxWidth: "100%",
            flex: "none",
            boxSizing: "border-box",
          }}
          className="relative z-10 rounded-3xl border border-cream bg-white p-6 shadow-2xl"
        >

          {/* Header */}
          <div className="relative flex items-center justify-center border-b border-cream/60 pb-3">

            <h3 className="text-lg font-semibold text-coffee text-center">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 flex size-8 items-center justify-center rounded-full text-coffee/60 hover:bg-milk hover:text-coffee transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

          </div>

          {/* Content Body */}
          <div className="py-4 text-sm text-coffee/80">
            {children}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
