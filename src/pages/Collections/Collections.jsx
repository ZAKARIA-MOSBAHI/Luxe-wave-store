import { useContext, useEffect } from "react";
import Title from "../../components/Title";
import { ShopContext } from "../../context/ProductContext";
import ProcuctsList from "./components/ProcuctsList";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/app/api/products";
import { setFilteredProducts, setProducts } from "@/app/slices/productSlice";
import { SlidersHorizontal } from "lucide-react";

const Collections = () => {
  const { setShowFilterMenu } = useContext(ShopContext);
  const ProductsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const results = await getProducts();
        dispatch(setProducts(results.products));
        dispatch(setFilteredProducts(results.products));
      } catch (e) {
        console.log(e);
      }
    };

    FetchProducts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mb-8  relative max-w-[1152px] w-full mx-auto xl:px-0 px-4">
      <div className="flex-1">
        <div className="flex flex-row justify-between items-center  mb-4">
          <Title title={"COLLECTIONS"} />
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

        <ProcuctsList filteredProducts={ProductsState.filteredProducts} />
      </div>
    </div>
  );
};

export default Collections;
