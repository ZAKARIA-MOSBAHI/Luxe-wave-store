import RemoveButton from "./RemoveButton";

const FavoriteProducts = ({ item }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="overflow-hidden  aspect-square mb-3  rounded-lg bg-zinc-100/20">
        <img
          src={item.productId.mainImage.url}
          alt={item.productId.mainImage.alt}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <RemoveButton productId={item.productId._id} />
    </div>
  );
};

export default FavoriteProducts;
