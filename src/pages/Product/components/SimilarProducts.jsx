import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/ProductContext";
import ProductCard from "../../../components/product/ProductCard";

function SimilarProducts({ pCategory, pId }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const { products } = useContext(ShopContext);
  const fetchSimilarProducts = async () => {
    const ProductsCopy = products.slice();
    setSimilarProducts(
      ProductsCopy.filter(
        (p) => p.category === pCategory && p._id !== pId
      ).slice(0, 4)
    );
  };
  useEffect(() => {
    fetchSimilarProducts();
  }, [pCategory, pId]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-4 gap-8 mb-5">
      {similarProducts &&
        similarProducts.map((product, index) => {
          return <ProductCard key={index} product={product} withHeart />;
        })}
    </div>
  );
}

export default SimilarProducts;
