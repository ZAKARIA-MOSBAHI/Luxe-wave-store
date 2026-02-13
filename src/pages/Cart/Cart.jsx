import { EmptyStateUI } from "@/components/shared/EmptyStateUI";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

import { useUserCart } from " @/hooks/client/useUserCart";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { cart } = useUserCart();
  if (cart?.items && cart?.items?.length === 0) {
    return (
      <EmptyStateUI
        title={"No items in cart"}
        description={
          "When you add a product to the cart, it will appear here. Start shopping to see your items!"
        }
        link={<Link to="/">Start Shopping</Link>}
        icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }
  return (
    <section>
      <div className="flex flex-col  md:flex-row justify-between ">
        <div className="flex flex-col w-full md:w-[60%] py-8">
          <h1 className="text-2xl font-medium">CART</h1>
          <div className="h-[1.5px]  bg-gray-200 sm:my-6 my-4"></div>
          {cart?.items?.length > 0 &&
            cart?.items?.map((item, index) => {
              return <CartItem item={item} key={index} />;
            })}
        </div>
        <OrderSummary />
      </div>
    </section>
  );
}

export default Cart;
