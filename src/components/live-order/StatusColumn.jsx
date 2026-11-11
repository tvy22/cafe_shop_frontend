import OrderCard from "./OrderCard";
import { ORDER_THEME } from "../../config/orderTheme";

export default function StatusColumn({ statusKey, orders, onView, onMoveStatus }) {
  const colConfig = ORDER_THEME.columns[statusKey] || {};

  return (
    <div
      className={`bg-cream/20 rounded-lg p-4 border-t-4 ${colConfig.borderColor} border-x border-b border-cream/50 min-h-[600px] flex flex-col`}
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-pill ${colConfig.dotBg} inline-block`} />
          <h2 className="text-h3 font-bold text-coffee">{colConfig.label}</h2>
        </div>
        <span className={`text-meta font-bold px-2.5 py-0.5 rounded-pill ${colConfig.badgeBg}`}>
          {orders.length}
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {orders.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-meta text-coffee/40 border border-dashed border-cream rounded-md">
            No orders in this stage
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={() => onView(order)}
              onMoveStatus={onMoveStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}