import { useContext } from "react";
import { ShopContext } from "../../../context/ProductContext";
import { Link } from "react-router-dom";

export default function OrderSummary() {
  const { cart, currency, shipping_fees } = useContext(ShopContext);

  return (
    <div className="w-full md:w-[35%]">
      <h1 className="text-2xl font-medium sm:py-8 py-4 ">ORDER SUMMARY</h1>
      <div className="flex flex-col p-8  border my-2">
        <p className="flex justify-between text-sm  font-light sm:text-base">
          {cart.items.length} ITEMS
          <span>
            {currency}
            {cart.total}
          </span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          SALES TAX
          <span>
            {currency}
            {0}
          </span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          DELIVERY
          <span>
            {currency}
            {shipping_fees}
          </span>
        </p>

        <div className="flex  justify-between py-4 border-t  border-gray-400">
          <p className="text-lg font-medium">TOTAL :</p>
          <p className="text-lg ">
            {currency}
            {cart.total + shipping_fees}
          </p>
        </div>
      </div>
      <Link to={"/place-order"}>
        <button className="px-8 py-2.5 bg-black w-full text-white my-4">
          CHECKOUT
        </button>
      </Link>
    </div>
  );
}
