import { useAuth } from "@/context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getClientAddress } from "@/services/address.service";
import { setUserAddress } from "@/app/slices/addressSlice";
import DeliverySection from "./components/sections/DeliverySection";
import OrderSummarySection from "./components/sections/OrderSummarySection";
export default function PlaceOrder() {
  const { user } = useAuth();
  const userAddressState = useSelector((state) => state.userAddress?.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndAddress = async () => {
      if (!userAddressState) {
        const addressResponse = await getClientAddress();
        if (addressResponse.success) {
          dispatch(setUserAddress(addressResponse.address));
        }
      }
    };
    fetchCartAndAddress();
  }, [cartState, userAddressState, dispatch]);

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
