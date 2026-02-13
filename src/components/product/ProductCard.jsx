import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../../assets/client/icons/HeartIcon";
import CardBadge from "../ui/CardBadge";
import { useAuth } from "@/context/AuthProvider";

import { returnImgUrl } from "@/utils/returnImgUrl";
import { useFavorites } from "@/hooks/client/useFavorites";
import { toast } from "sonner";

export default function ProductCard({
  product,
  withBadge = false,
  withHeart = false,
  badgeText = "",
  badgeColor = "",
}) {
  const { user } = useAuth();
  const { favoriteProducts, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavorite = async (e) => {
    e.stopPropagation();
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
      (item) => item.productId._id === product._id,
    );
    setIsFavorite(!!isProductInFavorites);
  }, [favoriteProducts]);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="group rounded-[12px] relative w-full max-w-[350px] overflow-hidden  transition-all duration-300 "
    >
      {/* Image Container with Overlay Effect */}
      <div className="relative overflow-hidden  max-h-[400px]  ">
        <img
          src={returnImgUrl(product.mainImage.url)}
          alt={product.mainImage.altText}
          title={product.mainImage.altText}
          className="h-full w-full object-cover rounded-[12px] absolute top-0 left-0 group-hover:opacity-0 transition-opacity duration-200"
          loading="lazy"
        />
        <img
          src={returnImgUrl(product.additionalImages[0].url)}
          alt={product.additionalImages[0].altText}
          title={product.additionalImages[0].altText}
          className="h-full w-full object-cover rounded-[12px]"
          loading="lazy"
        />
      </div>

      {/* Product Info Section */}
      <div className="pt-2 px-2 flex flex-col items-start text-left ">
        <p
          className="font-medium w-full text-gray-800 truncate text-sm md:text-base"
          title={product.name}
        >
          {product.name}
        </p>
        <p className=" text-sm md:text-base text-gray-600">
          {product.price}
          <span>
            {" "}
            {user?.currencyPreference ? user?.currencyPreference : "MAD"}
          </span>
        </p>
      </div>

      {/* Badge Conditional Rendering */}
      {withBadge && <CardBadge content={badgeText} color={badgeColor} />}

      {/* Heart Icon Conditional Rendering */}
      {withHeart && (
        <button
          onClick={handleFavorite}
          role="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-opacity-100"
        >
          <HeartIcon
            fill={isFavorite ? "#E60000" : "none"}
            stroke={isFavorite ? "" : "#fb2c36"}
            className="w-5 h-5 transition-all duration-300"
          />
        </button>
      )}
    </div>
  );
}
