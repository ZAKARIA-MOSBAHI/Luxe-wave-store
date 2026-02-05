import { setFavorites } from "@/app/slices/favoritesSlice";
import { buildApiResponse } from "@/lib/utils";
import {
  addFavoriteProduct,
  getClientFavoriteProducts,
  removeFavoriteProduct,
} from "@/services/favorite.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state) => state.favorites.favorites.favoriteProducts,
  );

  const [error, setError] = useState(null);

  const addFavorite = async (productId) => {
    const response = await addFavoriteProduct(productId);
    if (response.success) {
      dispatch(setFavorites(response.newFavoriteList));
      return buildApiResponse(true, response.message);
    } else {
      return buildApiResponse(false, response.message);
    }
  };
  const removeFavorite = async (productId) => {
    const response = await removeFavoriteProduct(productId);
    if (response.success) {
      dispatch(setFavorites(response.newFavoriteList));
      return buildApiResponse(true, response.message);
    } else {
      return buildApiResponse(false, response.message);
    }
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getClientFavoriteProducts();

      if (response.success) {
        dispatch(setFavorites(response.favorites));
      } else {
        setError(response.message);
      }
    };

    // cache-first: fetch only if not initialized
    if (favoriteProducts === null) {
      fetchFavorites();
    }
  }, [dispatch, favoriteProducts]);

  return {
    favoriteProducts,
    error,
    addFavorite,
    removeFavorite,
  };
};
