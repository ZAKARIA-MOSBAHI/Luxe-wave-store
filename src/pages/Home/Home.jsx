import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Policy from "./components/Policy";
import { products } from "../../assets/client/assets";
import ProductsCollection from "./components/ProductsCollection";
import NewsLetter from "../../components/NewsLetter";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import CategoryCard from "./components/CategoryCard";

import hoodies from "../../assets/client/images/hoodies-cat.jpg";
import tshirts from "../../assets/client/images/tshirt-cat.jpg";
import shorts from "../../assets/client/images/shorts-cat.jpg";
import accessories from "../../assets/client/images/accessory-cat.jpg";
import pants from "../../assets/client/images/pants-cat.jpg";
const images = [
  { name: "T-Shirts", image: tshirts },
  { name: "Bottoms", image: shorts },
  { name: "Women", image: pants },
  { name: "Accessories", image: accessories },
  { name: "Hoodies & Sweaters", image: hoodies },
];
function Home() {
  const [BestSellers, setBestSellers] = useState([]);
  const [LatestCollections, setLatestCollections] = useState([]);
  const location = useLocation();
  useEffect(() => {
    setLatestCollections(products.slice(10, 14));
    const filteredArr = products.filter(
      (product) => product.bestseller === true
    );
    setBestSellers(filteredArr.slice(0, 4));
  }, []);
  useEffect(() => {
    // check if the user is coming from the login page and if he just logged in
    if (location.state?.firstLogin) {
      toast.success("User Logged in Successfully.");
      // Clear the state after showing the toast
      // This prevents the toast from showing again on page refresh
      window.history.replaceState({}, "");
    }
  }, [location.state]);
  return (
    <div className="">
      <Hero />
      <CategoryCard />
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
      <Policy />
      <NewsLetter />
    </div>
  );
}

export default Home;
