import { useContext, useState } from "react";
import { ShopContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../assets/client/icons/HeartIcon";
import Badge from "./ui/Badge";

export default function ProductCard({
  product,
  withBadge = false,
  withHeart = false,
  badgeText = "",
  badgeColor = "",
}) {
  const { currency } = useContext(ShopContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <button
      onClick={handleProductClick}
      className="group relative w-full max-w-[350px] overflow-hidden  transition-all duration-300 "
    >
      {/* Image Container with Overlay Effect */}
      <div className="relative overflow-hidden  max-h-[400px]  bg-gray-100">
        <img
          loading="lazy"
          src={product.image[0]}
          alt={product.name}
          className="h-full w-full object-cover   transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Product Info Section */}
      <div className="py-4 px-2 flex flex-col items-start text-left gap-2 bg-white">
        <p className="text-xs uppercase tracking-wider text-gray-400">
          {product.category}'s Wear / {product.subCategory}
        </p>
        <p
          className="group-hover:underline  group-hover:text-gray-400 transition-all duration-300 font-medium w-full text-gray-800 truncate text-lg"
          title={product.name}
        >
          {product.name}
        </p>
        <p className="font-bold text-lg">
          <span className="text-sm font-normal">{currency}</span>
          {product.price}
        </p>
      </div>

      {/* Badge Conditional Rendering */}
      {withBadge && <Badge content={badgeText} color={badgeColor} />}

      {/* Heart Icon Conditional Rendering */}
      {withHeart && (
        <button
          onClick={handleFavorite}
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
    </button>
  );
}
