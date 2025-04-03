import { createContext, useEffect, useState } from "react";
import { products } from "../assets/client/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [sizeChoosen, setSizeChoosen] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  // options for filter menu
  const filterOptions = {
    category: ["men", "women", "kids"],
    price: ["low to high", "high to low"],
    weartype: ["topwear", "bottomwear", "winterwear"],
    size: ["S", "M", "L", "XL", "XXL"],
  };
  // filters selected by the user
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({
    category: null,
    price: null,
    weartype: null,
    size: null,
  });
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const addToCart = (value) => {
    if (value.sizeChoosen) {
      const similarItems = cart.items.filter(
        (item) =>
          item._id === value._id && item.sizeChoosen === value.sizeChoosen
      );

      if (similarItems.length === 0) {
        // If no similar items exist, add the new item to the cart
        setCart((prevCart) => ({
          ...prevCart,
          items: [...prevCart.items, value],
          total: prevCart.total + value.price,
        }));
      } else {
        // If a similar item exists, increase the quantity
        const updatedItems = cart.items.map((item) =>
          item._id === similarItems[0]._id &&
          item.sizeChoosen === similarItems[0].sizeChoosen
            ? { ...item, quantity: item.quantity + 1 } // Spread to avoid mutation
            : item
        );

        setCart((prevCart) => ({
          ...prevCart,
          items: updatedItems,
          total: prevCart.total + value.price, // Update the total price
        }));
      }
    } else {
      return;
    }
  };

  const incrementProductQuantity = (product) => {
    const updatedItems = cart.items.map((item) =>
      item._id === product._id && item.sizeChoosen === product.sizeChoosen
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart((prevCart) => ({
      ...prevCart,
      items: updatedItems,
      total: prevCart.total + product.price,
    }));
  };
  const decrementProductQuantity = (product) => {
    if (product.quantity === 1) {
      return;
    } else {
      const updatedItems = cart.items.map((item) =>
        item._id === product._id && item.sizeChoosen === product.sizeChoosen
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      setCart((prevCart) => ({
        ...prevCart,
        items: updatedItems,
        total: prevCart.total - product.price,
      }));
    }
  };
  const deleteProduct = (p) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: cart.items.filter((cartItem) => {
        return cartItem.ref !== p.ref;
      }),
      total: cart.total - p.price,
    }));
  };

  const search = (e) => {
    const value = e.target.value.toLowerCase().split(" ");
    const ProductsCopy = products.slice();
    const searchedProducts = ProductsCopy.filter((p) => {
      const productNameWords = p.name.toLowerCase().split(" ");
      // Check if any word from user input matches a word in the product name
      return value.some((val) => productNameWords.includes(val));
    });

    setSearchResults(searchedProducts);
  };
  const value = {
    sizeChoosen,
    setSizeChoosen,
    decrementProductQuantity,
    incrementProductQuantity,
    currency: "$",
    shipping_fees: 15,
    products,
    showSearch,
    setShowSearch,
    search,
    searchResults,
    addToCart,
    cart,
    setCart,
    deleteProduct,
    showFilterMenu,
    setShowFilterMenu,
    selectedFilterOptions,
    setSelectedFilterOptions,
    filterOptions,
    LoggedIn,
    setLoggedIn,
  };
  useEffect(() => {
    if (showSearch === false) {
      setSearchResults([]);
    }
  }, [showSearch]);

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
