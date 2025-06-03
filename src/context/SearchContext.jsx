import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
export const SearchContext = createContext();

export function SearchContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (value) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await api.post("/search", {
        query: value,
      });
      console.log("Search result:", response.data);
      setSearchResults(response.data.results);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    showSearch,
    setShowSearch,
    searchResults,
    handleSearch,
    searchQuery,
    setSearchQuery,
    setSearchResults,
    isLoading,
    setIsLoading,
    error,
    setError,
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
