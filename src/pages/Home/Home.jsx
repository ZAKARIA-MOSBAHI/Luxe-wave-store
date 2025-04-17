import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Policy from "./components/Policy";
import { products } from "../../assets/client/assets";
import ProductsCollection from "./components/ProductsCollection";
import NewsLetter from "../../components/NewsLetter";

function Home() {
  const [BestSellers, setBestSellers] = useState([]);
  const [LatestCollections, setLatestCollections] = useState([]);
  useEffect(() => {
    setLatestCollections(products.slice(10, 14));
    const filteredArr = products.filter(
      (product) => product.bestseller === true
    );
    setBestSellers(filteredArr.slice(0, 4));
  }, []);
  return (
    <div className="">
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
      <Policy />
      <NewsLetter />
    </div>
  );
}

export default Home;
