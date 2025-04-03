import { useContext } from "react";
import { ShopContext } from "../../context/ProductContext";

import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

function Cart() {
  const { cart } = useContext(ShopContext);
  console.log(cart);
  return (
    <div>
      <div className="flex flex-col  md:flex-row justify-between ">
        <div className="flex flex-col w-full md:w-[60%] py-8">
          <h1 className="text-2xl font-medium">CART</h1>
          <div className="h-[1.5px] bg-gray-200 sm:my-6 my-4"></div>
          {cart.items.map((item, index) => {
            return <CartItem item={item} key={index} />;
          })}
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}

export default Cart;
