import { Eye, Clock, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { ORDER_THEME } from "../../config/orderTheme";

export default function OrderCard({ order, onView, onMoveStatus }) {
  // Determine timer style dynamically from config based on elapsed time
  const getTimerConfig = (minutes) => {
    if (minutes >= ORDER_THEME.timerAlerts.urgent.minMinutes) {
      return ORDER_THEME.timerAlerts.urgent;
    }
    if (minutes >= ORDER_THEME.timerAlerts.warning.minMinutes) {
      return ORDER_THEME.timerAlerts.warning;
    }
    return ORDER_THEME.timerAlerts.normal;
  };

  const timerConfig = getTimerConfig(order.elapsedMinutes);
  const currentStatusConfig = ORDER_THEME.columns[order.status] || {};

  const getNextStatus = (status) => {
    if (status === "Incoming") return "Preparing";
    if (status === "Preparing") return "Ready";
    if (status === "Ready") return "Completed";
    return null;
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="bg-white rounded-md p-4 border border-stone-200/80 shadow-card hover:shadow-card-hover transition-all space-y-3">
      {/* Top Header & Timers */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
        <div>
          <span className="text-product font-bold text-coffee block">{order.id}</span>
          <div className="flex items-center gap-2 mt-0.5">
            {/* Visual distinction for Order Type vs Payment Method */}
            <span className="text-meta font-medium px-2 py-0.5 rounded-sm bg-stone-100 text-stone-800 border border-stone-200/60">
              {order.type} {order.table ? `• ${order.table}` : ""}
            </span>
            <span className="text-meta text-stone-500 font-medium">
              {order.payment}
            </span>
          </div>
        </div>

        {/* High-Scannability Timer Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-meta border ${timerConfig.style}`}
        >
          {order.elapsedMinutes >= ORDER_THEME.timerAlerts.urgent.minMinutes ? (
            <AlertTriangle size={12} className={timerConfig.iconColor} />
          ) : (
            <Clock size={12} className={timerConfig.iconColor} />
          )}
          <span>{order.elapsedMinutes}m ago</span>
        </div>
      </div>

      {/* Customer Name */}
      <div className="text-body font-bold text-coffee">{order.customer}</div>

      {/* Itemized Stack */}
      <div className="space-y-1.5 py-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="text-body">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-coffee">
                {item.qty}x {item.name}
              </span>
              <span className="text-meta text-coffee/60">{item.price}</span>
            </div>
            {item.customizations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {item.customizations.map((cust, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[11px] leading-none px-1.5 py-0.5 rounded bg-amber-50/70 text-amber-900 border border-amber-200/60 font-medium"
                  >
                    {cust}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer & Actions */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <div className="text-product font-bold text-coffee">{order.total}</div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onView}
            className="p-2 rounded-md hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
            title="View Full Receipt"
          >
            <Eye size={16} />
          </button>

          {nextStatus && (
            <button
              type="button"
              onClick={() => onMoveStatus(order.id, nextStatus)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-meta font-bold transition-colors cursor-pointer ${currentStatusConfig.actionBtn}`}
            >
              {order.status === "Ready" && <CheckCircle2 size={14} />}
              <span>{currentStatusConfig.actionText}</span>
              {order.status !== "Ready" && <ArrowRight size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}