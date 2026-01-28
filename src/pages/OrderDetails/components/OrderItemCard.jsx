import { Card, CardContent } from "@/components/ui/card";

export function OrderItemCard({ item }) {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 p-4">
      <img
        src={item.product.mainImage}
        alt={item.product.name}
        className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h4>

        <div className="flex items-center gap-3 mt-1">
          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            Size: {item.size}
          </span>

          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          ${item.product.price.toFixed(2)} each
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
