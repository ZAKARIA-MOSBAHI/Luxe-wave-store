import { X } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";

export default function RemoveButton({ productId }) {
  const { removeFavorite } = useFavorites();
  const handleClick = async (e) => {
    e.stopPropagation();
    const response = await removeFavorite(productId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
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
