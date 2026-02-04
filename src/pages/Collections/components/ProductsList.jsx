import { useEffect } from "react";
import ProductCard from "../../../components/product/ProductCard";
import { getClientFavoriteProducts } from "@/services/product.service";
import { setFavorites } from "@/app/slices/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthProvider";

export default function ProductsList({ filteredProducts }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const FavoriteProductsState = useSelector((state) => state.favorites);
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getClientFavoriteProducts();
      if (response.success) {
        dispatch(setFavorites(response.favorites));
      }
    };

    if (FavoriteProductsState.favoriteProducts.length === 0 && user) {
      fetchFavorites();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center lg:grid-cols-4 gap-4 gap-y-10">
      {filteredProducts.map((p) => {
        return <ProductCard product={p} key={p._id} withHeart />;
      })}
    </div>
  );
}
