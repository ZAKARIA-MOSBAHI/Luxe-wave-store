import { useEffect } from "react";
import FavoriteProducts from "./components/FavoriteProducts";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

export default function Favorites() {
  const { error, favoriteProducts } = useFavorites();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-10">
        Favorite Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteProducts?.length > 0 ? (
          favoriteProducts?.map((p) => (
            <FavoriteProducts key={p._id} item={p} />
          ))
        ) : (
          <p> no products found </p>
        )}
      </div>
    </>
  );
}
