import React, { useContext } from "react";
import StartIcon from "../../../assets/client/icons/StartIcon";
import { ShopContext } from "../../../context/ProductContext";
import HeartIcon from "../../../assets/client/icons/HeartIcon";

export default function ProductInfo({
  product,
  sizeChoosen,
  setSizeChoosen,
  err,
  handleClick,
}) {
  const { currency } = useContext(ShopContext);
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 underline w-fit">Details</h1>
      <div className="flex gap-8 flex-col">
        <h1 className="font-medium text-3xl ">{product.name}</h1>
        <p className=" text-gray-700">{product.description}</p>
        <div className="flex flex-wrap  gap-y-8 justify-between items-center">
          <div className="flex text-lg md:text-xl gap-4 items-center">
            <h2 className="  text-gray-500">Price </h2>
            <p className="font-medium">
              {currency}
              {product.price}
            </p>
          </div>
          <div className="flex  sm:max-w-[120px] lg:max-w-none text-lg md:text-xl gap-x-4 items-center flex-wrap">
            <h2 className="  text-gray-500">Rating (122)</h2>
            <div className="flex items-center ">
              <StartIcon count={4} className={"w-6 h-6 md:w-8 md:h-8"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg sm:text-xl">SIZES</p>
          <div className="flex items-center gap-2">
            {product.sizes &&
              product.sizes.map((s, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      sizeChoosen === s ? "border border-black" : ""
                    } flex items-center justify-center text-lg w-10 h-10  bg-gray-100 cursor-pointer hover:bg-gray-300 transition-all duration-500 `}
                    onClick={() => {
                      setSizeChoosen(s);
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            {err && <span className="px-4 text-red-500 text-sm">{err}</span>}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-8 py-2.5 w-fit bg-black text-white cursor-pointer"
            onClick={handleClick}
          >
            ADD TO CART
          </button>
          <div className="bg-gray-100 rounded-md flex justify-center items-center px-2">
            <HeartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
