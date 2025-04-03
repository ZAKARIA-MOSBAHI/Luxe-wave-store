import ProductCard from "../../../components/ProductCard";

export default function ProcuctsList({ filteredProducts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center lg:grid-cols-4 gap-4 gap-y-8">
      {filteredProducts.map((p, i) => {
        return <ProductCard product={p} key={i} withHeart />;
      })}
    </div>
  );
}
