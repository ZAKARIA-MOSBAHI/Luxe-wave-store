import { useContext } from "react";
import QuantityCounter from "./QuantityCounter";
import SelectMenu from "./SelectMenu";
import { ShopContext } from "../../../context/ProductContext";

export default function CartItem({ item }) {
  const { deleteProduct, currency } = useContext(ShopContext);
  return (
    <>
      <div className="flex w-full gap-4 relative my-2 p-4">
        <img
          src={item.image[0]}
          alt=""
          className="w-36 rounded-lg h-auto object-cover"
        />
        <div className="w-full flex-col flex gap-4 ">
          <div className="flex justify-between items-center flex-wrap text-lg sm:text-xl">
            <h1 className=" text-gray-600 my-2">{item.name}</h1>
            <p className="font-medium">
              {currency}
              {item.price}
            </p>
          </div>
          <div className="flex gap-4 md:gap-8 flex-wrap items-center">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-gray-500">Quantity </span>
              <QuantityCounter quantity={item.quantity} product={item} />
            </div>
            <div className="flex gap-4 flex-wrap items-center">
              <span className="text-gray-500">Size </span>
              <SelectMenu product={item} />
            </div>
          </div>
          <button
            className=" w-fit bg-gray-100 px-2 sm:px-4 gap-2 sm:gap-4 py-2.5  text-sm sm:text-base border-gray-800 rounded-md border-[1px]   text-gray-900  items-center hover:font-medium cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-300"
            onClick={() => deleteProduct(item)}
          >
            DELETE PRODUCT
          </button>
        </div>
      </div>

      <div className="h-[1.5px] bg-gray-200 sm:my-6 my-4"></div>
    </>
  );
}
