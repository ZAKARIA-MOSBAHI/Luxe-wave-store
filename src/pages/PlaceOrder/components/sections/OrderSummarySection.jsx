import OrderItem from "../OrderItem";
import { useUserCart } from "@/hooks/client/useUserCart";

export default function OrderSummarySection() {
  const { cart } = useUserCart();

  return (
    <div className="order-1 md:order-2 bg-[#F1F4F9] p-8 w-full">
      <h3 className=" typography-h3 mb-8">Order Items</h3>
      {cart?.items.length > 0
        ? cart?.items.map((item, index) => {
            return <OrderItem item={item} key={index} />;
          })
        : null}
      <p className="font-bold">Total : {cart?.total} MAD</p>
    </div>
  );
}
