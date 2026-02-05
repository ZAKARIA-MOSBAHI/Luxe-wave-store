import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import DeliverySection from "./components/sections/DeliverySection";
import OrderSummarySection from "./components/sections/OrderSummarySection";
export default function PlaceOrder() {
  const { user } = useAuth();

  const navigate = useNavigate();

  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <section className="space-y-10 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeliverySection />
        <OrderSummarySection />
      </div>
    </section>
  );
}
