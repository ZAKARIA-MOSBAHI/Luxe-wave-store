import { createContext, useContext, useState } from "react";

export const FilterMenuContext = createContext();

const FilterMenuProvider = (props) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // filters selected by the user
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({
    category: null,
    price: null,
    weartype: null,
    size: null,
  });

  const value = {
    showFilterMenu,
    setShowFilterMenu,
    selectedFilterOptions,
    setSelectedFilterOptions,
  };

  return (
    <FilterMenuContext.Provider value={value}>
      {props.children}
    </FilterMenuContext.Provider>
  );
};
export default FilterMenuProvider;

export const useFilterMenu = () => {
  const context = useContext(FilterMenuContext);

  if (context === undefined) {
    throw new Error("useFilterMenu must be used within a FilterMenuProvider");
  }

  return context;
};
