import hoodies from "../../../assets/client/images/hoodies-cat.jpg";
import tshirts from "../../../assets/client/images/tshirt-cat.jpg";
import shorts from "../../../assets/client/images/shorts-cat.jpg";
import accessories from "../../../assets/client/images/accessory-cat.jpg";
import pants from "../../../assets/client/images/pants-cat.jpg";
import { useNavigate } from "react-router-dom";
const images = [
  { name: "T-Shirts", image: tshirts },
  { name: "Bottoms", image: shorts },
  { name: "Women", image: pants },
  { name: "Accessories", image: accessories },
  { name: "Hoodies & Sweaters", image: hoodies },
];
export default function CategoryCard({
  categoryName = "",
  categoryImage = "",
}) {
  return (
    <button className=" w-full max-w-[280px] overflow-hidden  flex flex-col gap-2 group mx-auto">
      <img
        src={categoryImage}
        alt=""
        className=" min-h-[300px] max-h-[300px] object-cover h-full w-full"
      />
      <p className="group-hover:underline  font-medium text-left tracking-wider uppercase">
        {categoryName}
      </p>
    </button>
  );
}
