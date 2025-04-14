import "./App.css";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import FilterMenu from "./pages/Collections/components/FilterMenu";
import { lazy, Suspense, useContext } from "react";
import { ShopContext } from "./context/ProductContext";
import Loading from "./components/ui/Loading";
import ScrollToTop from "./components/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import Layout from "./components/Layout/Layout";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";

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
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminProducts = lazy(() => import("./admin/pages/Products"));
const AdminCategories = lazy(() => import("./admin/pages/Categories"));
const AdminUsers = lazy(() => import("./admin/pages/Users"));
const AdminOrders = lazy(() => import("./admin/pages/Orders"));
const AdminCarts = lazy(() => import("./admin/pages/Carts"));
const AdminDiscounts = lazy(() => import("./admin/pages/Discounts"));

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
      <Toaster />
      <FilterMenu
        showFilterMenu={showFilterMenu}
        setShowFilterMenu={setShowFilterMenu}
        selectedFilterOptions={selectedFilterOptions}
        setSelectedFilterOptions={setSelectedFilterOptions}
        filterOptions={filterOptions}
      />
      <SearchBar />
      <div>
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
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute>
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/carts"
                element={
                  <ProtectedRoute>
                    <AdminCarts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/discounts"
                element={
                  <ProtectedRoute>
                    <AdminDiscounts />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-all (outside Layout) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
