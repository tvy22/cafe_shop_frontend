import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function SlideDrawer({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Fade Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel Slide Animation */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 h-full w-full sm:w-[400px] bg-white shadow-2xl flex flex-col border-l border-cream"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream bg-white shrink-0">
              <h2 className="text-lg font-bold text-coffee">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-coffee/60 hover:text-coffee hover:bg-cream/50 transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 overflow-y-auto p-6 bg-white">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}