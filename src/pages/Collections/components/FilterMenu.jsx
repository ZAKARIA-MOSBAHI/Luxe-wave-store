import { useState } from "react";
import Accordion from "./Accordion";
import CrossIcon from "../../../assets/client/icons/CrossIcon";
import CheckmarkIcon from "../../../assets/client/icons/CheckmarkIcon";

function FilterMenu({
  filterOptions,
  selectedFilterOptions,
  setSelectedFilterOptions,
  showFilterMenu,
  setShowFilterMenu,
}) {
  const [openAccordion, setOpenAccordion] = useState({
    category: false,
    price: false,
    weartype: false,
    size: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
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
            <h2 className="text-lg font-bold">SORT & FILTER MENU</h2>
            <CrossIcon
              className=" cursor-pointer"
              onClick={() => setShowFilterMenu(false)}
            />
          </div>

          <div className="my-16">
            {Object.entries(filterOptions).map(([key, values], index) => {
              return (
                <Accordion
                  key={index}
                  title={key}
                  openAccordion={openAccordion}
                  toggleAccordion={toggleAccordion}
                >
                  {values.map((val, i) => {
                    return (
                      <div
                        key={i}
                        className={`${openAccordion[key] ? "" : "hidden"} ${
                          selectedFilterOptions[key] === val
                            ? "text-white bg-black"
                            : "hover:text-white hover:bg-black"
                        } p-4  border-b cursor-pointer border-gray-200 transition-all duration-300 `}
                        onClick={() => {
                          setSelectedFilterOptions((prev) => ({
                            ...prev,
                            [key]: val,
                          }));
                        }}
                      >
                        <p className=" uppercase flex justify-between">
                          {val}
                          {selectedFilterOptions[key] === val && (
                            <CheckmarkIcon />
                          )}
                        </p>
                      </div>
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
              onClick={() => {
                setSelectedFilterOptions({
                  category: null,
                  price: null,
                  weartype: null,
                  size: null,
                });
              }}
            >
              CLEAR FILTERS
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterMenu;
