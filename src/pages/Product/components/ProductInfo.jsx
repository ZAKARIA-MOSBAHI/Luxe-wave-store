import { useEffect, useState } from "react";

import HeartIcon from "../../../assets/client/icons/HeartIcon";
import { useAuth } from "@/context/AuthProvider";

import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

export default function ProductInfo({
  product,
  sizeChoosen,
  setSizeChoosen,
  err,
  handleClick,
}) {
  const { favoriteProducts, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useAuth();
  const handleFavorite = async () => {
    if (!user) {
      toast.error("Login To Favor Product ");

      return;
    }

    if (!isFavorite) {
      const result = await addFavorite(product?._id);
      if (result.success) {
        setIsFavorite(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await removeFavorite(product?._id);
      if (result.success) {
        setIsFavorite(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  useEffect(() => {
    const isProductInFavorites = favoriteProducts?.find(
      (item) => item.productId._id === product?._id,
    );
    setIsFavorite(isProductInFavorites ? true : false);
  }, [product?._id, favoriteProducts]);

  return (
    <div className="flex gap-6 flex-col justify-center">
      <h1 className="text-3xl font-bold tracking-tight">{product?.name}</h1>
      <p className="font-medium text-2xl mb-6">{product?.price} MAD</p>
      <div className="space-y-4 mb-6">
        <p className="text-gray-800 w-full  font-bold tracking-tight text-[18px]">
          Size
        </p>
        <div className="flex gap-2">
          {Object.keys(product?.sizes ?? {}).map((key, i) => (
            <button
              key={i}
              disabled={product?.sizes[key] > 0 ? false : true}
              className={`${product?.sizes[key] > 0 ? "" : "line-through"} ${
                sizeChoosen === key ? "border border-black" : ""
              } flex items-center justify-center px-4 py-2 w-fit h-fit  text-sm bg-gray-100 cursor-pointer hover:bg-gray-300 transition-all duration-500`}
              onClick={() => {
                setSizeChoosen(key);
              }}
            >
              {key} ({product?.sizes[key]})
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <p className="text-gray-800 w-full font-bold tracking-tight text-[18px]">
          Product's Description
        </p>

        <p className="text-gray-600">{product?.description}</p>
      </div>
      {err && (
        <span className="px-4 font-medium text-red-500 text-sm mb-2">
          {err}
        </span>
      )}
      <div className="flex gap-4">
        <button
          className="px-8 py-2.5 w-full bg-black text-white cursor-pointer"
          onClick={handleClick}
        >
          ADD TO CART
        </button>
        <button
          onClick={handleFavorite}
          className="bg-gray-100  flex justify-center items-center px-2"
        >
          <HeartIcon
            fill={isFavorite ? "#fb2c36" : "none"}
            stroke={isFavorite ? "#fb2c36" : "black"}
          />
        </button>
      </div>
    </div>
  );
}
