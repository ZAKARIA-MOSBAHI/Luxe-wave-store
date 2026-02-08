import { useFilterMenu } from "../../context/FilterMenuProvider";
import ProductsList from "./components/ProductsList";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import SectionTitle from "@/components/SectionTitle";
import { useLocation } from "react-router-dom";
const Collections = () => {
  const location = useLocation();
  console.warn("location ");
  console.log(location);

  const queryParams = new URLSearchParams(location.search);
  console.warn("queryParams ");
  console.log(queryParams);
  const { setShowFilterMenu } = useFilterMenu();
  const { filteredProducts } = useProducts();

  return (
    <section className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mb-8  relative max-w-[1152px] w-full mx-auto">
      <div className="flex-1">
        <div className="flex flex-row justify-between items-center  mb-4">
          <SectionTitle title={"Collections"} />

          <button
            title="filter menu"
            type="button"
            className="cursor-pointer flex px-4  gap-2 sm:gap-4 py-2.5  text-sm sm:text-base  sm:border-black sm:border bg-white text-black my-4 items-center font-medium"
            onClick={() => setShowFilterMenu((prevState) => !prevState)}
          >
            <span className="hidden sm:inline">SORT & FILTER</span>
            <SlidersHorizontal />
          </button>
        </div>

        <ProductsList filteredProducts={filteredProducts} />
      </div>
    </section>
  );
};

export default Collections;
