import SectionTitle from "../../../components/SectionTitle";
import ProductCard from "../../../components/product/ProductCard";
import Carousel from "../../../components/ui/Carousel";

export default function ProductsCollection({
  CollectionName,
  products,
  badgeText = "",
  badgeColor = "",
  ...rest
}) {
  return (
    <section className={`mx-auto w-full ${rest.className || ""}`} {...rest}>
      <SectionTitle title={CollectionName} />
      <Carousel
        className="max-w-[350px] mx-0 w-full sm:max-w-full"
        items={products}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        renderItem={(product, index) => (
          <ProductCard
            key={index}
            product={product}
            withBadge
            badgeText={badgeText}
            badgeColor={badgeColor}
          />
        )}
      />
    </section>
  );
}
