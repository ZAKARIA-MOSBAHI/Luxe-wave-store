import { useEffect } from "react";
import FavoriteProducts from "./components/FavoriteProducts";
import { getClientFavoriteProducts } from "@/app/api/products";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/app/slices/favoritesSlice";

export default function Favorites() {
  const FavoriteProductsState = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await getClientFavoriteProducts();
        if (response.success) {
          dispatch(setFavorites(response.favorites));
        }
        console.log("this is teh response ", response);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };
    onMount();
  }, []);

  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <>
<h2 className="text-3xl font-bold tracking-tight my-10">Favorite Products</h2>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {FavoriteProductsState.favoriteProducts.length > 0 ? (
          FavoriteProductsState.favoriteProducts.map((p) => (
            <FavoriteProducts key={p._id} item={p} />
          ))
        ) : (
          <p> no products found </p>
        )}
      </div>
    </>
  );
}
