import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { ShopContext } from "../../context/ProductContext";
import Pagination from "./components/Pagination";
import { useParams } from "react-router-dom";
import ProcuctsList from "./components/ProcuctsList";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts, getProducts } from "@/app/api/products";
import {
  setFilteredProducts,
  setFilterOptions,
  setProducts,
} from "@/app/slices/productSlice";
import { SlidersHorizontal } from "lucide-react";

const Collections = () => {
  const { products, setShowFilterMenu } = useContext(ShopContext);
  const ProductsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const maxPages = Math.ceil(products.length / 12);
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

  useEffect(() => {
    const productPage = products.slice((pageNumber - 1) * 12, pageNumber * 12);
  }, [pageNumber]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  relative max-w-[1152px] w-full mx-auto xl:px-0 px-4">
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
        {pageNumber > 0 && pageNumber < maxPages + 1 ? (
          <ProcuctsList filteredProducts={ProductsState.filteredProducts} />
        ) : (
          <div>NO PRODUCTS FOUND </div>
        )}
        <Pagination pageIndex={pageNumber} maxPages={maxPages} />
      </div>
    </div>
  );
};

export default Collections;
