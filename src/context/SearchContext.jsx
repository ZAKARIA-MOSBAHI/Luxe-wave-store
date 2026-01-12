import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
export const SearchContext = createContext();

export function SearchContextProvider({ children }) {
 
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchProduct = async (value) => {
    try {
      const response = await api.post("/search", {
        query: value,
      });
      console.log("Search result:", response.data.results);
      setSearchResults(response.data.results);
    } catch (err) {
      console.error("Search error:", err);
     
    }
  };

  const value = {
    showSearch,
    setShowSearch,
    searchResults,
    searchProduct,
    searchQuery,
    setSearchQuery,
    setSearchResults,
    
  };
  useEffect(() => {
    if (showSearch === false) {
      setSearchResults([]);
    }
  }, [showSearch]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within an SearchContextProvider");
  }
  return context;
};
