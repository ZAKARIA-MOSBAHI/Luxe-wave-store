import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";

import ProductsCollection from "../Home/components/ProductsCollection";
import ErrorPage from "../ErrorPage";
import { toast } from "sonner";
import { useUserCart } from "@/hooks/client/useUserCart";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";

export default function Product() {
  const { productId } = useParams();
  const { product, mainImg, setMainImg, isLoading, notFound } =
    useProduct(productId);
  const { products } = useProducts();
  const { addToCart } = useUserCart();

  const [sizeChoosen, setSizeChoosen] = useState("");

  const [similarProducts, setSimilarProducts] = useState([]);
  const [err, setErr] = useState("");

  const handleClick = async () => {
    if (sizeChoosen) {
      const response = await addToCart(productId, sizeChoosen);
      if (response.success) {
        setErr("");
        toast.success("Product added to cart");
      } else {
        setErr(response.message);
      }
    } else {
      setErr("Please select a size");
    }
  };
  useEffect(() => {
    setSizeChoosen("");
  }, [productId]);
  useEffect(() => {
    // next : change this into a filtering code
    if (products?.length > 0) {
      setSimilarProducts(products.slice(0, 4));
    }
  }, [products]);

  if (notFound) {
    return (
      <ErrorPage
        statusCode={404}
        message="this product not found"
        redirectLink="/collections"
        redirectText="Go back to collections"
      />
    );
  }

  return (
    <div className=" transition-opacity duration-500 opacity-100 relative">
      {/* PRODUCT DATA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImage
          mainImg={mainImg}
          setMainImg={setMainImg}
          product={product}
        />
        <ProductInfo
          product={product}
          sizeChoosen={sizeChoosen}
          setSizeChoosen={setSizeChoosen}
          err={err}
          handleClick={handleClick}
        />
      </section>

      {/* similar products */}
      <div className="">
        <ProductsCollection
          CollectionName={"Similar Items"}
          products={similarProducts}
        />
      </div>
      <section className=" mx-auto max-w-4xl space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Our Return Policy.
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          <strong>Delivery fees are 30 MAD</strong> for orders under{" "}
          <strong>500 MAD</strong>, and{" "}
          <strong>free for orders above 500 MAD</strong>.
          <br />
          Items can be <strong>exchanged within 8 days</strong> of receiving
          your order. <strong>Additional fees may apply</strong> in case of
          returns.
          <br />
          During <strong>sales or promotional periods</strong>, exchanges are{" "}
          <strong>free only for size or color changes</strong>, subject to stock
          availability. If a <strong>different item</strong> is chosen, the{" "}
          <strong>promotion will no longer apply</strong>.
        </p>
      </section>
    </div>
  );
}
