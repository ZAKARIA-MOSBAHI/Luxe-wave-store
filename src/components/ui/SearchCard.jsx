import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function SearchCard({ image, name, price, id, description }) {
  const { setShowSearch } = useContext(SearchContext);
  return (
    <Link
      to={`/product/${id}`}
      className="flex gap-4 w-full bg-white"
      onClick={() => setShowSearch(false)}
    >
      <img
        src={image}
        alt=""
        className="w-full max-w-[100px] h-[100px] object-contain"
      />

      <div className=" flex flex-col justify-center gap-1 w-full py-2 pr-2 overflow-hidden">
        <h3 className="truncate text-ellipsis overflow-hidden font-medium whitespace-nowrap w-full">
          {name}
        </h3>
        <p className="text-gray-400 truncate text-ellipsis overflow-hidden whitespace-nowrap w-full">
          {description}
        </p>
        <p className="font-bold text-lg">
          <span className="text-sm font-normal">$</span>
          {price}
        </p>
      </div>
    </Link>
  );
}
