import React, { useContext, useEffect, useState } from "react";
import StartIcon from "../../../assets/client/icons/StartIcon";
import { ShopContext } from "../../../context/ProductContext";
import HeartIcon from "../../../assets/client/icons/HeartIcon";
import { useAuth } from "@/context/AuthProvider";
import {
  addFavoriteProduct,
  getClientFavoriteProducts,
  removeFavoriteProduct,
} from "@/app/api/products";
import { useDispatch, useSelector } from "react-redux";

export default function ProductInfo({
  product,
  sizeChoosen,
  setSizeChoosen,
  err,
  handleClick,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const FavoriteProductsState = useSelector((state) => state.favorites);

  const { user } = useAuth();
  const handleFavorite = async () => {
    if (!user) {
      console.log("login to favor this !");
      return;
    }

    if (!isFavorite) {
      const result = await addFavoriteProduct(product?._id);
      if (result.success) {
        setIsFavorite(true);
      }
    } else {
      const result = await removeFavoriteProduct(product?._id);
      if (result.success) {
        setIsFavorite(false);
      }
    }
  };
  useEffect(() => {
    const FetchFavoriteProducts = async () => {
      try {
        const response = await getClientFavoriteProducts();

        const isProductInFavorites = response.favorites.find(
          (item) => item.productId._id === product?._id
        );

        setIsFavorite(isProductInFavorites ? true : false);
        console.log("this is teh response ", response);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };
    if (FavoriteProductsState.favoriteProducts.length <= 0) {
      FetchFavoriteProducts();
    } else {
      const isProductInFavorites = FavoriteProductsState.favoriteProducts.find(
        (item) => item.productId._id === product?._id
      );
      setIsFavorite(isProductInFavorites ? true : false);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 underline w-fit">Details</h1>
      <div className="flex gap-8 flex-col">
        <h1 className="font-medium text-3xl ">{product?.name}</h1>
        <p className=" text-gray-700">{product?.description}</p>
        <div className="flex flex-wrap  gap-y-8 justify-between items-center">
          <div className="flex text-lg md:text-xl gap-2 items-center">
            <h2 className=" text-base text-gray-500">Price </h2>
            <p className="font-medium">{product?.price} MAD</p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className=" text-base  text-gray-500">Sizes </h2>

            {Object.keys(product?.sizes ?? {}).map((key, i) => (
              <button
                key={i}
                className={`${
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

        <div className="flex gap-4">
          <button
            className="px-8 py-2.5 w-fit bg-black text-white cursor-pointer"
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
        {err && <span className="px-4 text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
}
