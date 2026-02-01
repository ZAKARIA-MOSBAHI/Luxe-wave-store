import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const ProductImagePreview = ({
  imageUrl,
  imageAlt,
  onRemove,
  onClick = () => {},
  className,
}) => {
  return (
    <div
      onClick={() => onClick}
      className={cn("relative group cursor-pointer", className)}
    >
      <div className="overflow-hidden  aspect-square mb-3  rounded-lg bg-zinc-100/20">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      {/* make RemoveButton Component re-usable so you delete this static code */}
      <button
        onClick={onRemove}
        type="button"
        className="scale-0 group-hover:scale-100 origin-center transition-all duration-300 flex absolute top-0 translate-x-1/2 cursor-pointer -translate-y-1/2 z-50 right-0 bg-white shadow-sm items-center justify-center w-8 h-8 rounded-full"
        role="remove-button"
      >
        <X className="size-5 text-red-500" />
      </button>
    </div>
  );
};

export default ProductImagePreview;
