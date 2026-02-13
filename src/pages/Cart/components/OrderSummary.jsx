import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useUserCart } from "@/hooks/client/useUserCart";

export default function OrderSummary() {
  const { user } = useAuth();
  const { cart } = useUserCart();

  return (
    <div className="w-full md:w-[35%]">
      <h1 className="text-2xl font-medium sm:py-8 py-4 ">ORDER SUMMARY</h1>
      <div className="flex flex-col p-8  border my-2">
        <p className="flex justify-between text-sm  font-light sm:text-base">
          {cart?.items.length || 0} ITEMS
          <span>
            {cart?.total ?? 15}
            {user?.currencyPreference ? user?.currencyPreference : "MAD"}
          </span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          SALES TAX
          <span>
            {0} {user?.currencyPreference ? user?.currencyPreference : "MAD"}
          </span>
        </p>
        <p className="flex justify-between text-sm  font-light sm:text-base">
          DELIVERY
          <span>0 MAD</span>
        </p>

        <div className="flex  justify-between py-4 border-t  border-gray-400">
          <p className="text-lg font-medium">TOTAL :</p>
          <p className="text-lg ">
            {cart?.total}{" "}
            {user?.currencyPreference ? user?.currencyPreference : "MAD"}
          </p>
        </div>
      </div>
      <Link to={cart?.items?.length > 0 ? "/place-order" : null}>
        <button className="px-8 py-2.5 bg-black w-full text-white my-4">
          CHECKOUT
        </button>
      </Link>
    </div>
  );
}
