import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Policy from "./components/Policy";
import { products } from "../../assets/client/assets";
import ProductsCollection from "./components/ProductsCollection";
import NewsLetter from "../../components/NewsLetter";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import Carousel from "../../components/ui/Carousel";
import SectionTitle from "../../components/SectionTitle";
import Title from "../../components/Title";

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
      <SectionTitle className={"mt-10 px-4"}>
        <Title title={"Shop By Category"} />
      </SectionTitle>
      <Carousel />
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
