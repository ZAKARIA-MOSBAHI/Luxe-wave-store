import { useFilterMenu } from "../../context/FilterMenuProvider";
import ProductsList from "./components/ProductsList";
import { SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import SectionTitle from "@/components/SectionTitle";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { EmptyStateUI } from "@/components/shared/EmptyStateUI";
const Collections = () => {
  const location = useLocation();

  const { setShowFilterMenu } = useFilterMenu();
  const { filteredProducts, filterProducts } = useProducts();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get("category");
    console.log(queryValue);
    if (queryValue) {
      filterProducts("category", queryValue);
    } else {
      filterProducts("category", null);
    }
  }, [location.search]);

  if (filteredProducts?.length === 0) {
    return (
      <EmptyStateUI
        title={"No products in that category are found!"}
        description={"change the catgory into an existing category"}
        icon={<X />}
        link={<Link to="/"> Back to home</Link>}
      />
    );
  }
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
