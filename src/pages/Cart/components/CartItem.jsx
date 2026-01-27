import QuantityCounter from "./QuantityCounter";
import SelectMenu from "./SelectMenu";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "@/app/api/carts";
import { setCart } from "@/app/slices/cartSlice";
import { returnImgUrl } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";

export default function CartItem({ item }) {
  const { user } = useAuth();
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
          src={returnImgUrl(item?.productId.mainImage.url)}
          alt=""
          className="w-36 rounded-lg h-[130px] object-cover"
        />
        <div className="w-full flex-col flex gap-4 ">
          <div className="flex justify-between items-center flex-wrap text-base font-medium">
            <h1 className="">{item?.productId.name}</h1>
            <p className="">
              {item?.productId.price}{" "}
              {user?.currencyPreference ? user?.currencyPreference : "MAD"}
            </p>
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
            className="w-fit text-sm sm:text-base text-gray-600 hover:text-gray-900 cursor-pointer underline "
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
