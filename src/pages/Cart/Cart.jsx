import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

import { useCart } from "@/hooks/useCart";

function Cart() {
  const { cart } = useCart();

  return (
    <section>
      <div className="flex flex-col  md:flex-row justify-between ">
        <div className="flex flex-col w-full md:w-[60%] py-8">
          <h1 className="text-2xl font-medium">CART</h1>
          <div className="h-[1.5px]  bg-gray-200 sm:my-6 my-4"></div>
          {cart?.items?.length > 0 ? (
            cart?.items?.map((item, index) => {
              return <CartItem item={item} key={index} />;
            })
          ) : (
            <p className="text-sm sm:text-base text-center text-gray-300">
              No Product Is In Cart
            </p>
          )}
        </div>
        <OrderSummary />
      </div>
    </section>
  );
}

export default Cart;
