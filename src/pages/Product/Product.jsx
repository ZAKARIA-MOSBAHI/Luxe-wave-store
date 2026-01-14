import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "./components/SimilarProducts";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/app/api/carts";
import { setCart } from "@/app/slices/cartSlice";
import { getProductById } from "@/app/api/products";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [sizeChoosen, setSizeChoosen] = useState("");
   const { productId } = useParams();
  const ProductsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  const handleClick = async () => {
    try {
      if (sizeChoosen) {
        const h = { productId, sizeChoosen };
        console.log("Adding product to cart with size:", h);
        const response = await addProductToCart(productId, sizeChoosen);
        if (response.success === true) {
          dispatch(setCart(response.cart));
          setErr("");
        } else {
          setErr(response.message || "Failed to add product to cart");
        }
      } else {
        setErr("Please select a size");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
         setErr("");

        // First try to find product in Redux store
        if (ProductsState.length > 0) {
          const foundProduct = ProductsState.find(
            (item) => item._id === productId
          );
          if (foundProduct) {
            setProduct(foundProduct);
            setMainImg(
              foundProduct.mainImage?.url || foundProduct.image?.[0] || ""
            );
             return;
          }
        }

        // If not found anywhere, fetch from API
        const result = await getProductById(productId);
        setProduct(result.product);
        setMainImg(result.product.mainImage?.url || "");
      } catch (error) {
        console.error("Error fetching product:", error);
        setErr("Failed to load product");
      }  
    };

    if (productId) {
      fetchProduct();
      setSizeChoosen(null); // Reset size selection when product changes
    }
  }, [productId, ProductsState]);

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
