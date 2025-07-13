import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ProductContext";
import SimilarProducts from "./components/SimilarProducts";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { getProductById } from "@/app/api/products";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);
  const { products, currency, addToCart, sizeChoosen, setSizeChoosen } =
    useContext(ShopContext);
  const { productId } = useParams();
  const ProductsState = useSelector((state) => state.products);

  const [err, setErr] = useState("");

  const handleClick = () => {
    if (sizeChoosen) {
      addToCart({
        ...product,
        sizeChoosen: sizeChoosen,
        quantity: 1,
      });
      toast.success("Added to cart", {
        description: "Product has been added to your cart.",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
          style: {
            background: "transparent",
            padding: "0",
          },
        },
      });
    } else {
      setErr("Please select a size");
    }
  };

  // Single useEffect to handle product fetching
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErr("");

        // First try to find product in Redux store
        if (ProductsState.products.length > 0) {
          const foundProduct = ProductsState.products.find(
            (item) => item._id === productId
          );
          if (foundProduct) {
            setProduct(foundProduct);
            setMainImg(
              foundProduct.mainImage?.url || foundProduct.image?.[0] || ""
            );
            setLoading(false);
            return;
          }
        }

        // If not found in Redux, try context
        if (products.length > 0) {
          const foundProduct = products.find((p) => p._id === productId);
          if (foundProduct) {
            setProduct(foundProduct);
            setMainImg(foundProduct.image?.[0] || "");
            setLoading(false);
            return;
          }
        }

        // If not found anywhere, fetch from API
        const result = await getProductById(productId);
        setProduct(result.product);
        setMainImg(result.mainImage?.url || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        setErr("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
      setSizeChoosen(null); // Reset size selection when product changes
    }
  }, [productId, ProductsState.products, products]); // Include all dependencies

  // Show loading state
  if (loading) {
    return (
      <div className="px-4 pt-10 flex justify-center items-center min-h-[400px]">
        <div>Loading product...</div>
      </div>
    );
  }

  // Show error state
  if (err && !product) {
    return (
      <div className="px-4 pt-10 flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">{err}</div>
      </div>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <div className="px-4 pt-10 flex justify-center items-center min-h-[400px]">
        <div>Product not found</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 transition-opacity duration-500 opacity-100 relative">
      {/* PRODUCT DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      </div>
      {/* similar products */}
      <div className="my-20">
        <p className="text-2xl font-medium my-6 md:my-12">SIMILAR PRODUCTS</p>
        <SimilarProducts pCategory={product?.category} pId={product?._id} />
      </div>
    </div>
  );
}
