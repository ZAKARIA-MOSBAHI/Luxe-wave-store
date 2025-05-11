import SectionTitle from "../../../components/SectionTitle";
import ProductCard from "../../../components/ProductCard";
import Title from "../../../components/Title";
import { Button } from "../../../admin/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function ProductsCollection({
  CollectionName,
  products,
  badgeText,
  badgeColor,
}) {
  return (
    <div className="max-w-[1152px] mx-auto w-full lg:px-0 px-8">
      <SectionTitle className={"mt-10"}>
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
    </div>
  );
}
