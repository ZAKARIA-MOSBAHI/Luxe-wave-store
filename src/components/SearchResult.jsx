import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ProductContext";

export default function SearchResult({ result }) {
  const { setShowSearch } = useContext(ShopContext);
  return (
    <Link
      onClick={() => {
        setShowSearch(false);
      }}
      to={`/product/${result._id}`}
      className=" gap-2 sm:gap-4 transition-all duration-500 w-36 sm:w-60 hover:bg-gray-100 cursor-pointer
    border-1"
    >
      <div className="overflow-hidden">
        <img
          src={result.image[0]}
          alt=""
          className="w-full hover:scale-110 transition ease-in-out"
        />
      </div>
      <div className="flex  flex-col p-2 gap-2">
        <p className="text-sm sm:text-base text-black truncate">
          {result.name}
        </p>
        <p className="text-sm sm:text-base text-gray-500 pl-1 ">
          ${result.price}
        </p>
      </div>
    </Link>
  );
}
