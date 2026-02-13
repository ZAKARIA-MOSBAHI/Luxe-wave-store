import { useEffect } from "react";
import FavoriteProducts from "./components/FavoriteProducts";
import { useAuth } from "@/context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmptyStateUI } from "@/components/shared/EmptyStateUI";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/client/useFavorites";

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
  }
  if (favoriteProducts && favoriteProducts?.length === 0) {
    return (
      <EmptyStateUI
        title={"No favorite product found."}
        description={
          "When you click the heart icon, the product will appear here!"
        }
        link={<Link to="/">Start Shopping</Link>}
        icon={<Heart className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-10">
        Favorite Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteProducts?.length > 0 &&
          favoriteProducts?.map((p) => (
            <FavoriteProducts key={p._id} item={p} />
          ))}
      </div>
    </>
  );
}
