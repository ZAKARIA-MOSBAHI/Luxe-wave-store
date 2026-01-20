import { useSelector } from "react-redux";
import OrderItem from "../OrderItem";

export default function OrderSummarySection() {
  const cartState = useSelector((state) => state.cart.data);

  return (
    <div className="order-1 md:order-2 bg-[#F1F4F9] p-8 w-full">
      <h3 className="text-3xl font-bold tracking-tight mb-8">Order Items</h3>
      {cartState?.items.length > 0
        ? cartState?.items.map((item, index) => {
            return <OrderItem item={item} key={index} />;
          })
        : null}
      <p className="font-bold">Total : {cartState?.total} MAD</p>
    </div>
  );
}
