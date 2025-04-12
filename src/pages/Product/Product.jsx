import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ProductContext";
import SimilarProducts from "./components/SimilarProducts";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function Product() {
  const [product, setProduct] = useState({});
  const [mainImg, setMainImg] = useState("");
  const { products, currency, addToCart, sizeChoosen, setSizeChoosen } =
    useContext(ShopContext);
  const { productId } = useParams();

  const [err, setErr] = useState("");
  const fetchProductData = async () => {
    products.map((p) => {
      if (p._id === productId) {
        setProduct(p);
        setMainImg(p.image[0]);
        return;
      }
    });
  };
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
  useEffect(() => {
    setSizeChoosen(null);
    fetchProductData();
  }, [productId]);

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
        <SimilarProducts pCategory={product.category} pId={product._id} />
      </div>
    </div>
  );
}
