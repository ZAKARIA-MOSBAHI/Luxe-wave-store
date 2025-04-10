import "./App.css";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import FilterMenu from "./pages/Collections/components/FilterMenu";
import { lazy, Suspense, useContext } from "react";
import { ShopContext } from "./context/ProductContext";
import Loading from "./components/ui/Loading";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ScrollToTop from "./components/ScrollTop";
import AdminDashboard from "../admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import Layout from "./components/Layout/Layout";

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
      <div className="max-w-[1152px] w-full mx-auto px-4 md:px-8">
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/collections/:pageNumber"
                  element={<Collections />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/product/:productId" element={<Product />} />
              </Route>
              {/* ADMIN ROUTES  */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-all (outside Layout) */}
              <Route
                path="*"
                element={<ErrorPage message={"Not found"} status={404} />}
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
