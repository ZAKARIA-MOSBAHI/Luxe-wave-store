import { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/ProductContext";
import { assets } from "../assets/client/assets";
import SearchResult from "./SearchResult";
import CrossIcon from "../assets/client/icons/CrossIcon";

function SearchBar() {
  const { showSearch, setShowSearch, search, searchResults } =
    useContext(ShopContext);
  const { cross_icon } = assets;
  const searchInput = useRef(null);
  const handleSearch = (e) => {
    search(e);
  };
  useEffect(() => {
    searchInput.current.focus();
  }, []);
  useEffect(() => {
    if (showSearch === false) {
      searchInput.current.value = "";
    }
  }, [showSearch]);
  return (
    <div
      className={`absolute left-0  transition-all duration-500 ${
        showSearch ? "top-0  z-101 opacity-100" : "top-[-100%] opacity-0"
      } h-full w-full bg-gray-500/50 backdrop-blur`}
    >
      <div className="flex items-center bg-white  p-4">
        <CrossIcon
          className=" absolute left-[90%] sm:left-[95%] cursor-pointer"
          onClick={() => setShowSearch(false)}
        />

        <input
          ref={searchInput}
          type="text"
          className="w-full outline-indigo-500 py-4 text-gray-500 placeholder:text-sm sm:placeholder:text-lg sm:text-lg   focus:outline-hidden border-b-black border-b-2"
          placeholder="Enter Search..."
          id=""
          onChange={handleSearch}
        />
      </div>
      {/* results div  */}
      <div className="flex flex-wrap  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center place-items-center bg-white   p-4">
        {searchResults.length === 0
          ? "NO PRODUCTS FOUND"
          : searchResults.map((r, i) => {
              return <SearchResult key={i} result={r} />;
            })}
      </div>
    </div>
  );
}

export default SearchBar;
