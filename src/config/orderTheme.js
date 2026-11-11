// Centralized theme configuration for Live Order Queue UI/UX
export const ORDER_THEME = {
  // Status Columns & Badges Configuration
  columns: {
    Incoming: {
      label: "Incoming",
      borderColor: "border-sky-400",
      dotBg: "bg-sky-500",
      badgeBg: "bg-sky-100 text-sky-900",
      actionBtn: "bg-sky-600 hover:bg-sky-700 text-white",
      actionText: "Accept",
    },
    Preparing: {
      label: "Preparing",
      borderColor: "border-orange-400",
      dotBg: "bg-orange-500",
      badgeBg: "bg-orange-100/70 text-orange-900",
      actionBtn: "bg-orange-600 hover:bg-orange-700 text-white",
      actionText: "Ready",
    },
    Ready: {
      label: "Ready / Pickup",
      borderColor: "border-emerald-500",
      dotBg: "bg-emerald-500",
      badgeBg: "bg-emerald-100 text-emerald-900",
      actionBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
      actionText: "Complete",
    },
  },

  // Wait Time Scannability Levels
  timerAlerts: {
    urgent: {
      minMinutes: 20,
      style: "bg-rose-100 text-rose-800 border-rose-300 animate-pulse font-bold",
      iconColor: "text-rose-600",
    },
    warning: {
      minMinutes: 10,
      style: "bg-amber-100 text-amber-900 border-amber-300 font-semibold",
      iconColor: "text-amber-700",
    },
    normal: {
      minMinutes: 0,
      style: "bg-stone-100 text-stone-700 border-stone-200 font-medium",
      iconColor: "text-stone-500",
    },
  },
};