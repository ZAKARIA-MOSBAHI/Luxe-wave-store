import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterMenu from "./pages/Collections/components/FilterMenu";
import { lazy, Suspense, useContext } from "react";
import { ShopContext } from "./context/ProductContext";
import Loading from "./components/ui/Loading";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ScrollToTop from "./components/ScrollTop";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Collections = lazy(() => import("./pages/Collections/Collections"));
const Product = lazy(() => import("./pages/Product/Product"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Order = lazy(() => import("./pages/Order"));

function App() {
  const {
    showFilterMenu,
    setShowFilterMenu,
    selectedFilterOptions,
    setSelectedFilterOptions,
    filterOptions,
  } = useContext(ShopContext);
  return (
    <div className={`relative overflow-hidden`}>
      <FilterMenu
        showFilterMenu={showFilterMenu}
        setShowFilterMenu={setShowFilterMenu}
        selectedFilterOptions={selectedFilterOptions}
        setSelectedFilterOptions={setSelectedFilterOptions}
        filterOptions={filterOptions}
      />
      <SearchBar />
      <Navbar />
      <div className="max-w-[1152px] w-full mx-auto px-4 md:px-8">
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/collections/:pageNumber" element={<Collections />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
