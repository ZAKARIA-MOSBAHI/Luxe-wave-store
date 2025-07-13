import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { products } from "../../assets/client/assets";
import ProductsCollection from "./components/ProductsCollection";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SectionTitle from "../../components/SectionTitle";
import Title from "../../components/Title";
import CategoryCarousel from "./components/CategoryCarousel";
import NewsLetter from "./components/NewsLetter";
import WhyUs from "./components/WhyUs";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/app/api/products";
import { setProducts } from "@/app/slices/productSlice";

function Home() {
  const ProductsState = useSelector((state) => state.products);
  const [BestSellers, setBestSellers] = useState([]);
  const [LatestCollections, setLatestCollections] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const results = await getProducts();
        dispatch(setProducts(results.products));
        setBestSellers(results.products.slice(0, 4));
        setLatestCollections(results.products.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    if (ProductsState.products.length <= 0) {
      FetchProducts();
    } else {
      setBestSellers(ProductsState.products.slice(0, 4));
      setLatestCollections(ProductsState.products.slice(0, 4));
    }
  }, []);
  useEffect(() => {
    // check if the user is coming from the login page and if he just logged in
    if (location.state?.firstLogin) {
      toast.success("User Logged in Successfully.");
    } else if (location.state?.signedUp) {
      // After successful signup
      toast.custom(
        (t) => (
          <div className="flex p-6 rounded-md flex-col gap-3 bg-white shadow-md">
            <div className="font-medium">🎉 Welcome aboard!</div>
            <p>Your account was created successfully.</p>
            <p className="text-sm text-gray-600">
              Complete your profile to enable ordering
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/complete-profile"); // Redirect to profile completion
                }}
                className="px-3 py-1 text-sm bg-black text-white rounded "
              >
                Complete Profile Now
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                Later
              </button>
            </div>
          </div>
        ),
        {
          duration: 8000, // Longer duration for important message

          style: {
            minWidth: "350px",
          },
        }
      );
    }
    // Clear the state after showing the toast
    // This prevents the toast from showing again on page refresh
    window.history.replaceState({}, "");
  }, [location.state]);
  return (
    <div className="">
      <Hero />
      <SectionTitle className={"mt-10 px-4"}>
        <Title title={"Shop By Category"} />
      </SectionTitle>
      <CategoryCarousel />
      <ProductsCollection
        CollectionName={"Best Sellers"}
        products={BestSellers}
        badgeColor={"red"}
        badgeText={"Best Seller"}
      />
      <ProductsCollection
        CollectionName={"Latest Collections"}
        products={LatestCollections}
        badgeColor={"green"}
        badgeText={"New Arrival"}
      />
      <WhyUs />
      <NewsLetter />
    </div>
  );
}

export default Home;
