import { returnImgUrl } from "@/utils/returnImgUrl";
import RemoveButton from "./RemoveButton";
import { useNavigate } from "react-router-dom";

const FavoriteProducts = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${item.productId._id}`);
  };
  return (
    <div onClick={handleClick} className="relative group cursor-pointer">
      <div className="overflow-hidden  aspect-square mb-3  rounded-lg bg-zinc-100/20">
        <img
          src={returnImgUrl(item.productId.mainImage.url)}
          alt={item.productId.mainImage.alt}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <RemoveButton productId={item.productId._id} />
    </div>
  );
};

export default FavoriteProducts;
