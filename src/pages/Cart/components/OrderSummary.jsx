import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const shipping_fees = 15;
  const cartState = useSelector((state) => state.cart.data);

  return (
    <div className="w-full md:w-[35%]">
      <h1 className="text-2xl font-medium sm:py-8 py-4 ">ORDER SUMMARY</h1>
      <div className="flex flex-col p-8  border my-2">
        <p className="flex justify-between text-sm  font-light sm:text-base">
          {cartState?.items.length || 0} ITEMS
          <span>${cartState?.total ?? 15}</span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          SALES TAX
          <span>${0}</span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          DELIVERY
          <span>${shipping_fees}</span>
        </p>

        <div className="flex  justify-between py-4 border-t  border-gray-400">
          <p className="text-lg font-medium">TOTAL :</p>
          <p className="text-lg ">
            ${cartState?.total + shipping_fees || shipping_fees}
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
