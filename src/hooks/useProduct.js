import { getProductById } from "@/services/product.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useProduct = (productId) => {
  const products = useSelector((state) => state.products.products);

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      setNotFound(false);

      if (Array.isArray(products) && products.length > 0) {
        const foundProduct = products.find((p) => p._id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          setMainImg(
            foundProduct.mainImage?.url || foundProduct.image?.[0] || "",
          );
          setIsLoading(false);
          return;
        }
      }

      const result = await getProductById(productId);

      if (result.success) {
        setProduct(result.product);
        setMainImg(result.product.mainImage?.url || "");
      } else {
        setNotFound(true);
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [productId, products]);

  return {
    product,
    mainImg,
    setMainImg,
    isLoading,
    notFound,
  };
};
