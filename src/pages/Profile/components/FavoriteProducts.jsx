const favoriteProducts = [
  {
    id: 1,
    name: "Classic Black Coat",
    price: "$299",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "White Silk Blouse",
    price: "$189",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Leather Tote Bag",
    price: "$249",
    image: "/placeholder.svg",
  },
];

const FavoriteProducts = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Favorite Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-zinc-100/20">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-zinc-900">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
