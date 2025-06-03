import { useContext, useEffect, useRef, useState } from "react";
import SearchCard from "./SearchCard";
import { SearchContext } from "@/context/SearchContext";
import { cn } from "@/admin/utils/clsx";
export default function SearchResults() {
  const [height, setHeight] = useState(0);
  const { searchResults, searchQuery, isLoading, error } =
    useContext(SearchContext);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      setHeight(el.offsetHeight);
    }
  }, [searchResults, isLoading]);

  if (searchQuery.trim() === "") return null;
  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-0 divide-y divide-gray-200 mt-[70px] z-[1] right-5 w-80 bg-white",
        height > 320 ? "overflow-y-scroll  max-h-80" : "h-auto"
      )}
    >
      {isLoading && (
        <p className="text-center py-4 text-gray-500">Loading...</p>
      )}

      {error && <p className="text-center py-4 text-gray-500">{error}</p>}

      {searchResults.length > 0
        ? searchResults.map((item) => (
            <SearchCard
              key={item._id}
              image={item.mainImage.url}
              name={item.name}
              price={item.price}
              description={item.description}
              id={item._id}
            />
          ))
        : null}
    </div>
  );
}
