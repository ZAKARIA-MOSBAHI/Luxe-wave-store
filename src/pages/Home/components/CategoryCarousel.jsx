import Carousel from "../../../components/ui/Carousel";
import CategoryCard from "./CategoryCard";

import tshirts from "../../../assets/client/images/tshirt-cat.jpg";
import shorts from "../../../assets/client/images/shorts-cat.jpg";
import accessories from "../../../assets/client/images/accessory-cat.jpg";
import hoodies from "../../../assets/client/images/hoodies-cat.jpg";
import pants from "../../../assets/client/images/pants-cat.jpg";
import { useDeviceType } from "../../../hooks/useDeviceType";
const categories = [
  { name: "T-Shirts", image: tshirts },
  { name: "Bottoms", image: shorts },
  { name: "Women", image: pants },
  { name: "Accessories", image: accessories },
  { name: "Hoodies & Sweaters", image: hoodies },
];
export default function CategoryCarousel() {
  const { deviceType } = useDeviceType();
  return (
    <Carousel
      items={categories}
      spaceBetween={deviceType === "cellphone" ? 0 : 8}
      renderItem={(item) => (
        <CategoryCard categoryImage={item.image} categoryName={item.name} />
      )}
    />
  );
}
