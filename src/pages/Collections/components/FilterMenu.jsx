import { useState } from "react";
import Accordion from "@/components/ui/Accordion";

import { Check, X } from "lucide-react";

import { useFilterMenu } from "@/context/FilterMenuProvider";
import { FILTER_OPTIONS } from "@/constants/constants";
import { useProducts } from "@/hooks/useProducts";

function FilterMenu() {
  const {
    selectedFilterOptions,

    showFilterMenu,
    setShowFilterMenu,
  } = useFilterMenu();

  const [openAccordion, setOpenAccordion] = useState({
    gender: false,
    category: false,
    price: false,
    size: false,
  });

  const { filterProducts, removeFilters, options } = useProducts();

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      className={` ${
        showFilterMenu ? "visible" : "invisible"
      } absolute z-100 top-0 right-0 before:content[' '] before:bg-black/50 before:backdrop:blur-2xl before:absolute before:top-0 before:left-0 before:w-full before:h-full   w-full h-full flex justify-end transition-all duration-500 `}
    >
      <div
        className={` ${
          showFilterMenu ? "right-0 " : "right-[-100%]"
        }  fixed top-0 overflow-y-scroll  transition-all duration-500  w-full h-full sm:w-1/2 lg:w-1/3 bg-white`}
        style={{ scrollbarWidth: "none" }}
      >
        {/* adding the transition to the child element bcs fixed is based on the viewport not the parent*/}
        <div
          className={`flex ${
            showFilterMenu ? "right-0 " : "right-[-100%]"
          } fixed top-0  right-0 transition-all duration-500 w-full  sm:w-1/2 lg:w-1/3 justify-between items-center px-4 h-16 border-b bg-white border-gray-200`}
        >
          <h2 className="font-bold">SORT & FILTER MENU</h2>
          <X
            className="size-8 cursor-pointer"
            onClick={() => setShowFilterMenu(false)}
          />
        </div>

        <div className="my-16">
          {Object.entries(FILTER_OPTIONS).map(([key, values], index) => {
            return (
              <Accordion
                key={index}
                title={key}
                openAccordion={openAccordion}
                toggleAccordion={toggleAccordion}
              >
                {values.map((val, i) => {
                  return (
                    <button
                      key={i}
                      className={`${openAccordion[key] ? "" : "hidden"} ${
                        selectedFilterOptions[key] === val
                          ? "text-white bg-black"
                          : "hover:text-white hover:bg-black"
                      } p-4 group  border-b cursor-pointer border-gray-200 transition-all w-full duration-300 `}
                      onClick={() => filterProducts(key, val)}
                    >
                      <p className="uppercase flex justify-between">
                        {val}
                        {options[key] === val && (
                          <Check className="size-6 group-hover:text-white text-black" />
                        )}
                      </p>
                    </button>
                  );
                })}
              </Accordion>
            );
          })}
        </div>
        <div
          className={`flex ${
            showFilterMenu ? "right-0 " : "right-[-100%]"
          } fixed bottom-0  right-0 transition-all duration-500 w-full  sm:w-1/2 lg:w-1/3 justify-end items-center cursor-pointer px-4 h-16 border-t bg-white border-gray-200`}
        >
          <h2
            className="text-base font-medium underline"
            onClick={removeFilters}
          >
            CLEAR FILTERS
          </h2>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
