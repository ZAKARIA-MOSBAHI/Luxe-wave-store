import "./App.css";
import { Routes, Route } from "react-router-dom";
import FilterMenu from "./pages/Collections/components/FilterMenu";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import Loading from "./components/ui/Loading";
import ScrollToTop from "./components/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import { Toaster } from "sonner";
import ErrorPage from "./pages/ErrorPage";
import { SearchContext } from "./context/SearchContext";
import ProfilePageLayout from "./components/Layout/ProfilePageLayout";
import Favorites from "./pages/Favorites/Favorites";
import { DisableScroll, EnableScroll } from "./lib/utils";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Collections = lazy(() => import("./pages/Collections/Collections"));
const Product = lazy(() => import("./pages/Product/Product"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const OrderHistory = lazy(() => import("./pages/OrderHistory/OrderHistory"));
const OrderDetails = lazy(() => import("./pages/OrderDetails/OrderDetails"));
const Order = lazy(() => import("./pages/PlaceOrder/PlaceOrder"));
const AdminProducts = lazy(() => import("./admin/pages/Products"));
const AdminCategories = lazy(() => import("./admin/pages/Categories"));
const AdminUsers = lazy(() => import("./admin/pages/Users"));
const AdminOrders = lazy(() => import("./admin/pages/Orders/Orders"));
const AdminCarts = lazy(() => import("./admin/pages/Carts"));
const AdminDiscounts = lazy(() => import("./admin/pages/Discounts"));
const AddProductPage = lazy(
  () => import("./admin/pages/Products/AddProductPage"),
);
const EditProductPage = lazy(
  () => import("./admin/pages/Products/EditProductPage"),
);
const AdminNotificationsPage = lazy(
  () => import("./admin/pages/AdminNotificationsPage"),
);
const AddCategoryPage = lazy(
  () => import("./admin/pages/Categories/AddCategoryPage"),
);
const EditCategoryPage = lazy(
  () => import("./admin/pages/Categories/EditCategoryPage"),
);

function App() {
  const { showSearch } = useContext(SearchContext);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  useEffect(() => {
    if (showSearch || isMobileNavOpen) {
      DisableScroll();
    } else {
      EnableScroll();
    }
    return () => {
      EnableScroll();
    };
  }, [showSearch, isMobileNavOpen]);

  return (
    <div className="relative overflow-hidden">
      <Toaster />
      <FilterMenu />

      <div>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              element={
                <Layout
                  isMobileNavOpen={isMobileNavOpen}
                  setIsMobileNavOpen={setIsMobileNavOpen}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/cart" element={<Cart />} />

              <Route element={<ProfilePageLayout />}>
                <Route path="/account" element={<Profile />} />
                <Route path="/account/favorites" element={<Favorites />} />
                <Route
                  path="/account/order-history"
                  element={<OrderHistory />}
                />
                <Route
                  path="/account/order-history/:orderId"
                  element={<OrderDetails />}
                />
              </Route>
              <Route path="/orders" element={<Order />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/product/:productId" element={<Product />} />
            </Route>
            {/* login routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* ADMIN ROUTES  */}

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
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute>
                  <AdminNotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute>
                  <AddProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/:productId/edit"
              element={
                <ProtectedRoute>
                  <EditProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories/add"
              element={
                <ProtectedRoute>
                  <AddCategoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories/:categoryId/edit"
              element={
                <ProtectedRoute>
                  <EditCategoryPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Catch-all (outside Layout) */}
            <Route
              path="*"
              element={
                <ErrorPage
                  statusCode={404}
                  message="Page Not Found"
                  redirectLink="/"
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
