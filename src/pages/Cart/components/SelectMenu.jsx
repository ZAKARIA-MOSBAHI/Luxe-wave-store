import React, { useContext, useEffect, useState } from "react";
import { products } from "../../../assets/client/assets";
import { ShopContext } from "../../../context/ProductContext";

export default function SelectMenu({ product }) {
  const { cart, setCart, setSizeChoosen } = useContext(ShopContext);
  const [selected, setSelected] = useState(product.sizeChoosen);
  const [isopen, setIsOpen] = useState(false);
  const [optionList, setOptionList] = useState(product.sizes);
  const handleSizeChange = (size) => {
    setIsOpen(false);
    if (size === selected) {
      return;
    }
    setSelected(size);
    console.log("product");
    console.log(product);
    // check for similar sizes
    const similarSizes = cart.items.filter(
      (item) => product._id === item._id && size === item.sizeChoosen
    );
    console.log("simalar Items");
    console.log(similarSizes);
    if (similarSizes.length === 0) {
      const updatedCart = cart.items.map((item) =>
        product._id === item._id && product.sizeChoosen === item.sizeChoosen
          ? { ...item, sizeChoosen: size }
          : item
      );
      setCart((prevCart) => ({
        items: updatedCart,
        total: prevCart.total,
      }));
    } else {
      const updatedCart = cart.items
        .map((item) =>
          product._id === item._id && size === item.sizeChoosen
            ? { ...item, quantity: item.quantity + product.quantity }
            : product._id === item._id &&
              product.sizeChoosen === item.sizeChoosen
            ? undefined
            : item
        ) // remove item if it's similar
        .filter((item) => item !== undefined);
      console.log(updatedCart);
      setCart((prevCart) => ({
        items: updatedCart,
        total: prevCart.total,
      }));
    }
  };
  // useEffect(() => {
  //   setOptionList(Product.sizes);
  // }, []);
  return (
    <div className="relative w-20">
      <button
        type="button"
        className="grid w-full cursor-pointer grid-cols-1 rounded-md  bg-white py-1.5  text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isopen)}
      >
        <span className="col-start-1 row-start-1 flex items-center gap-3 pl-4 pr-8">
          <span className="block truncate">{selected}</span>
        </span>
        <svg
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isopen && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
          tabIndex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {optionList.map((option, index) => (
            <li
              key={index}
              className={`relative cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white py-2  text-gray-900 text-center select-none ${
                selected === option ? "bg-black text-white font-semibold" : ""
              } `}
              id="listbox-option-0"
              role="option"
              onClick={() => handleSizeChange(option)}
            >
              <span className="block font-normal">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
