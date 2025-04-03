import SectionTitle from "../../../components/SectionTitle";
import ProductCard from "../../../components/ProductCard";

export default function ProductsCollection({
  CollectionName,
  products,
  badgeText,
  badgeColor,
}) {
  return (
    <>
      <SectionTitle title={CollectionName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center  gap-8 ">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              withBadge
              badgeText={badgeText}
              badgeColor={badgeColor}
            />
          );
        })}
      </div>
    </>
  );
}
