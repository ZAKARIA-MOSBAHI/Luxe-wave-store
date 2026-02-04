import { removeFavoriteProduct } from "@/services/product.service";
import { setFavorites } from "@/app/slices/favoritesSlice";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function RemoveButton({ productId }) {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    try {
      e.stopPropagation();
      console.log("product with id ", productId, "should be removed ");
      const response = await removeFavoriteProduct(productId);
      if (response.success) {
        //means it was deleted successfully
        toast.success("Product removed from favorites");
        dispatch(setFavorites(response.newFavoriteList));
      } else {
        // means an unsuccessfull response
        console.log("this is from the button comp");
        toast.error(response.message);
      }
    } catch (e) {
      console.log("error");
      console.log(e);
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="scale-0 group-hover:scale-100 origin-center transition-all duration-300 flex absolute top-0 translate-x-1/2 cursor-pointer -translate-y-1/2 z-50 right-0 bg-white shadow-sm items-center justify-center w-8 h-8 rounded-full"
      role="remove-favorite-button"
    >
      <X className="size-5 text-red-500" />
    </button>
  );
}
