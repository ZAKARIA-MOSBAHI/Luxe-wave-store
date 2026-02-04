import { useEffect, useState } from "react";

import ProductsCollection from "./components/ProductsCollection";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CategoriesGrid from "./components/CategoriesGrid";
import { assets } from "@/assets/client/assets";
import Hero from "./components/Hero";
import { useProducts } from "@/hooks/useProducts";

function Home() {
  const {
    Denim_category,
    Shorts_category,
    Sweatshirt_category,
    Tshirt_category,
  } = assets;
  const { products } = useProducts();
  const [BestSellers, setBestSellers] = useState([]);
  const [LatestCollections, setLatestCollections] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (products?.length > 0) {
      const bestSellerProducts = products?.filter(
        (product) => product.badge === "Best Seller",
      );
      const newArrivalProducts = products?.filter(
        (product) => product.badge === "New Arrivals",
      );
      setBestSellers(bestSellerProducts ?? []);
      setLatestCollections(newArrivalProducts ?? []);
    }
  }, [products]);

  useEffect(() => {
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
        },
      );
    } else if (location.state?.hasOrdered) {
      toast.success("Order Created Successfully.");
    }

    window.history.replaceState({}, "");
  }, [location.state]);
  return (
    <div className="pt-[10px]">
      <Hero />

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
      {/* Categories display */}
      <section className="py-16 mb-0 bg-[#000]">
        <div className="flex items-center gap-2  md:gap-4 mb-8">
          <h1 className="tracking-tighter font-bold text-mobile-h2 md:text-desktop-h2 text-white">
            Browse Our Categories
          </h1>
          <p className="w-10  hidden md:block lg:w-14 h-[2px] bg-white"></p>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center">
          <CategoriesGrid
            firstColSpan="col-span-12 sm:col-span-5"
            secondColSpan="col-span-12 sm:col-span-7"
            firstImg={Tshirt_category}
            secondImg={Shorts_category}
          />
          <CategoriesGrid
            firstColSpan="col-span-12 sm:col-span-7"
            secondColSpan="col-span-12 sm:col-span-5"
            firstImg={Sweatshirt_category}
            secondImg={Denim_category}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
