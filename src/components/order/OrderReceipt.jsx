import { Printer, XCircle } from "lucide-react";

export default function OrderReceipt({ order, onVoidOrder }) {
  if (!order) return null;

  const mockItems = [
    {
      id: 1,
      name: "Iced Latte",
      qty: 2,
      price: "$3.50",
      customizations: ["Oat Milk", "50% Sugar", "Less Ice"],
    },
    {
      id: 2,
      name: "Espresso Citrus",
      qty: 1,
      price: "$4.00",
      customizations: ["Double Shot"],
    },
    {
      id: 3,
      name: "Matcha Latte",
      qty: 1,
      price: "$4.50",
      customizations: ["Whole Milk", "Normal Ice"],
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cream bg-cream/20 p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-coffee/60 font-medium">Customer</span>
          <span className="font-bold text-coffee">{order.customer}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-coffee/60 font-medium">Order Type</span>
          <span className="font-bold text-coffee">{order.type}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-coffee/60 font-medium">Payment Method</span>
          <span className="font-bold text-coffee">{order.payment}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-coffee/60 font-medium">Time Created</span>
          <span className="font-bold text-coffee">{order.createdAt}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-coffee/50 mb-3">
          Ordered Items
        </h3>
        <div className="divide-y divide-cream border-y border-cream">
          {mockItems.map((item) => (
            <div key={item.id} className="py-3.5 space-y-1">
              <div className="flex items-center justify-between font-bold text-coffee">
                <span>
                  {item.qty}x {item.name}
                </span>
                <span>{item.price}</span>
              </div>
              {item.customizations.length > 0 && (
                <p className="text-xs text-coffee/60">
                  {item.customizations.join(" • ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-sm text-coffee/70">
          <span>Subtotal</span>
          <span>$15.50</span>
        </div>
        <div className="flex items-center justify-between text-sm text-coffee/70">
          <span>Tax (0%)</span>
          <span>$0.00</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold text-coffee pt-2 border-t border-cream">
          <span>Total Amount</span>
          <span>{order.total}</span>
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <button
          type="button"
          onClick={handlePrint}
          className="flex w-full items-center justify-center gap-2 rounded-pill bg-matcha px-4 py-2.5 font-bold text-coffee hover:bg-matcha/80 transition-colors cursor-pointer"
        >
          <Printer size={18} />
          <span>Print Receipt</span>
        </button>

        {order.status !== "Cancelled" && (
          <button
            type="button"
            onClick={() => onVoidOrder?.(order.id)}
            className="flex w-full items-center justify-center gap-2 rounded-pill border border-caramel/30 px-4 py-2.5 font-bold text-caramel hover:bg-caramel/10 transition-colors cursor-pointer"
          >
            <XCircle size={18} />
            <span>Void / Cancel Order</span>
          </button>
        )}
      </div>
    </div>
  );
}