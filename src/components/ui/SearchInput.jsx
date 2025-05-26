import { cn } from "@/admin/utils/clsx";
import { Search, X } from "lucide-react";
import React, { useEffect } from "react";

export default function SearchInput({ setShowSearch, showSearch }) {
  const searchRef = React.useRef(null);
  useEffect(() => {
    if (showSearch) {
      searchRef.current.focus();
    } else {
      searchRef.current.value = "";
    }
  }, [showSearch]);
  return (
    <div className="flex gap-2 items-center">
      <X
        className={`cursor-pointer size-5 transition-opacity duration-150 ${
          showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowSearch(false)}
      />
      <div
        className={cn(
          "rounded-full flex transition-all duration-300",
          showSearch ? "bg-gray-100 p-2 px-4" : "bg-transparent p-0 px-0"
        )}
      >
        <input
          type="text"
          ref={searchRef}
          placeholder="Search"
          className={cn(
            "outline-none border-none bg-transparent transition-all duration-300 placeholder:text-gray-400/50 placeholder:font-medium",
            showSearch ? "w-[150px] delay-100" : "w-[0px] delay-0"
          )}
        />
        <Search
          className={cn(
            "cursor-pointer transition-all duration-150",
            showSearch ? "size-5" : "size-6"
          )}
          onClick={() => setShowSearch(!showSearch)}
        />
      </div>
    </div>
  );
}
