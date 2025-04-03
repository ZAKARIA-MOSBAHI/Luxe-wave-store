import { useContext } from "react";
import { ShopContext } from "../../../context/ProductContext";

export default function QuantityCounter({ quantity = 1, product }) {
  const { incrementProductQuantity, decrementProductQuantity } =
    useContext(ShopContext);
  return (
    <form className="max-w-sm ">
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          onClick={() => decrementProductQuantity(product)}
          data-input-counter-decrement="counter-input"
          className="shrink-0 bg-gray-100 cursor-pointer hover:bg-gray-200 inline-flex items-center justify-center   rounded-md p-1 focus:ring-gray-100   focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-4 h-4 text-gray-900 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <span className="shrink-0 text-gray-900   font-medium   max-w-[2.5rem]  px-2 text-center">
          {quantity}
        </span>
        <button
          onClick={() => incrementProductQuantity(product)}
          type="button"
          id="increment-button"
          data-input-counter-increment="counter-input"
          className="shrink-0 bg-gray-100  cursor-pointer hover:bg-gray-200 inline-flex items-center justify-center rounded-md p-1 focus:ring-gray-100   focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-4 h-4 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
