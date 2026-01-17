import { updateCartItemSize } from "@/app/api/carts";
import { setCart } from "@/app/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function SelectMenu({ product }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(product.itemSize);
  const [isopen, setIsOpen] = useState(false);
  const [optionList, setOptionList] = useState(product.sizes);
  const handleSizeChange = async (newSize) => {
    setIsOpen(false);
    if (newSize === selected) {
      return;
    }
    const result = await updateCartItemSize(
      product.productId._id,
      selected,
      newSize,
    );
    if (result.success) {
      dispatch(setCart(result.cart));
      setSelected(newSize);
    } else {
      toast.error(result.message);
    }
  };
  useEffect(() => {
    const productSizes = Object.keys(product.productId.sizes);
    setOptionList(productSizes);
  }, []);
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
