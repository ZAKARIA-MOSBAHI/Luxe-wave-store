import hoodies from "../../../assets/client/images/hoodies-cat.jpg";
import tshirts from "../../../assets/client/images/tshirt-cat.jpg";
import shorts from "../../../assets/client/images/shorts-cat.jpg";
import accessories from "../../../assets/client/images/accessory-cat.jpg";
import pants from "../../../assets/client/images/pants-cat.jpg";
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
    <div className=" w-full max-w-[280px] overflow-hidden  flex flex-col gap-2 group mx-auto">
      <img
        loading="lazy"
        src={categoryImage}
        alt=""
        className=" min-h-[300px] max-h-[300px] object-cover h-full w-full"
      />
      <p className="group-hover:underline  font-medium tracking-wider uppercase">
        {categoryName}
      </p>
    </div>
  );
}
