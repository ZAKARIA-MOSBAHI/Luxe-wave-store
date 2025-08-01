import { useEffect } from "react";

import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import { getClientCart } from "@/app/api/carts";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/app/slices/cartSlice";

function Cart() {
  const cartState = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLoggingUserCart = async () => {
      try {
        const response = await getClientCart();
        console.log(response);

        dispatch(setCart(response.cart));
      } catch (error) {
        console.log(error);
      }
    };
    if (Object.keys(cartState ?? {}).length > 0) return;
    fetchLoggingUserCart();
  }, []);

  return (
    <div>
      <div className="flex flex-col  md:flex-row justify-between ">
        <div className="flex flex-col w-full md:w-[60%] py-8">
          <h1 className="text-2xl font-medium">CART</h1>
          <div className="h-[1.5px]  bg-gray-200 sm:my-6 my-4"></div>
          {cartState?.items.length > 0 ? (
            cartState?.items.map((item, index) => {
              return <CartItem item={item} key={index} />;
            })
          ) : (
            <p className="text-xl text-center text-gray-300">
              No Product Is In Cart
            </p>
          )}
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

export default Cart;
