import SectionTitle from "../../../components/SectionTitle";
import ProductCard from "../../../components/product/ProductCard";
import Title from "../../../components/Title";
import { Button } from "../../../admin/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Carousel from "../../../components/ui/Carousel";

export default function ProductsCollection({
  CollectionName,
  products,
  badgeText,
  badgeColor,
}) {
  return (
    <div className="mx-auto w-full lg:px-0 px-8">
      <SectionTitle className={"mt-10 px-4"}>
        <Title title={CollectionName} />

        <Button
          variant="link"
          size="icon"
          className="w-fit text-base font-medium cursor-pointer group"
        >
          <span className="uppercase">Shop {CollectionName}</span>
          <ArrowRight
            size={32}
            className="group-hover:translate-x-0.5 transition-all duration-300"
          />
        </Button>
      </SectionTitle>
      <Carousel
        className="w-full"
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
    </div>
  );
}
