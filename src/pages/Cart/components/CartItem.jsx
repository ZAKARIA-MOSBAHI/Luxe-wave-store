import { useContext, useEffect } from "react";
import QuantityCounter from "./QuantityCounter";
import SelectMenu from "./SelectMenu";
import { ShopContext } from "../../../context/FilterMenuProvider";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "@/app/api/carts";
import { setCart } from "@/app/slices/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const productId = item?.productId._id;
      const response = await deleteCartItem(productId, item?.itemSize);
      console.log(response);
      if (response.success === true) {
        dispatch(setCart(response.cart));
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <>
      <div className="flex w-full gap-4 relative my-2 p-4">
        <img
          src={item.productId.mainImage?.url}
          alt=""
          className="w-36 rounded-lg h-auto object-cover"
        />
        <div className="w-full flex-col flex gap-4 ">
          <div className="flex justify-between items-center flex-wrap text-lg sm:text-xl">
            <h1 className=" text-gray-600 my-2">{item?.productId.name}</h1>
            <p className="font-medium">${item?.productId.price}</p>
          </div>
          <div className="flex gap-4 md:gap-8 flex-wrap items-center">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-gray-500">Quantity </span>
              <QuantityCounter product={item} />
            </div>
            <div className="flex gap-4 flex-wrap items-center">
              <span className="text-gray-500">Size </span>
              <SelectMenu product={item} />
            </div>
          </div>
          <button
            className=" w-fit bg-gray-100 px-2 sm:px-4 gap-2 sm:gap-4 py-2.5  text-sm sm:text-base border-gray-800 rounded-md border-[1px]   text-gray-900  items-center hover:font-medium cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-300"
            onClick={handleDelete}
          >
            DELETE PRODUCT
          </button>
        </div>
      </div>

      <div className="h-[1.5px] bg-gray-200 sm:my-6 my-4"></div>
    </>
  );
}
