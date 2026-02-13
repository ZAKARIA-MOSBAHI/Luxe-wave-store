import { useEffect, useRef, useState } from "react";
import SearchCard from "./SearchCard";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/admin/utils/clsx";
import { returnImgUrl } from "@/utils/returnImgUrl";
export default function SearchResults() {
  const [height, setHeight] = useState(0);
  const { searchResults, searchQuery } = useSearch();
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      setHeight(el.offsetHeight);
    }
  }, [searchResults]);

  if (searchQuery.trim() === "") return null;
  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-0 divide-y divide-gray-200 mt-[70px] z-[1] right-5 w-80 bg-white",
        height > 320 ? "overflow-y-scroll  max-h-80" : "h-auto",
      )}
    >
      {searchResults.length > 0
        ? searchResults.map((item) => (
            <SearchCard
              key={item._id}
              image={returnImgUrl(item.mainImage.url)}
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
