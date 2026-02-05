import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

export default function QuantityCounter({ product }) {
  const { AddToCart, DecrementItemQuantity } = useCart();

  const handleIncrement = async () => {
    try {
      const productId = product?.productId._id;
      const response = await AddToCart(productId, product?.itemSize);
      if (!response.success) {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const handleDecrement = async () => {
    const productId = product?.productId._id;
    const response = await DecrementItemQuantity(productId, product?.itemSize);
    if (!response.success) {
      toast.error(response?.message);
    }
  };

  return (
    <form className="max-w-sm ">
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          onClick={handleDecrement}
          data-input-counter-decrement="counter-input"
          className="shrink-0 bg-gray-100 cursor-pointer hover:bg-gray-200 inline-flex items-center justify-center   rounded-md p-1 focus:ring-gray-100   focus:ring-2 focus:outline-none"
        >
          <Minus strokeWidth={3} className="size-4  text-gray-900" />
        </button>
        <span className="shrink-0 text-gray-900   font-medium   max-w-[2.5rem]  px-2 text-center">
          {product?.quantity || 1}
        </span>
        <button
          onClick={handleIncrement}
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="shrink-0 bg-gray-100  cursor-pointer hover:bg-gray-200 inline-flex items-center justify-center rounded-md p-1 focus:ring-gray-100   focus:ring-2 focus:outline-none"
        >
          <Plus strokeWidth={3} className="size-4  text-gray-900" />
        </button>
      </div>
    </form>
  );
}
