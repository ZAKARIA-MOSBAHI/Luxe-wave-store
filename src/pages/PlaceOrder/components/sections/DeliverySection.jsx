import UserHeader from "../UserHeader";
import MissingInfoAlerts from "../MissingInfoAlerts";
import InfoGrid from "@/components/shared/InfoGrid";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthProvider";
import { createClientOrder } from "@/services/order.service";
import { toast } from "sonner";
import { clearCart } from "@/app/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { addUserOrder } from "@/app/slices/userOrderSlice";
import { useAddress } from "@/hooks/useAddress";

export default function DeliverySection() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = useAddress();

  const userOrderState = useSelector((state) => state.userOrderState);
  const fields = [
    {
      label: "Country",
      value: address?.country ?? "Not Found",
    },
    {
      label: "Full Name",
      value: user?.name,
    },
    {
      label: "Phone Number",
      value: user?.phone,
    },
    {
      label: "Shipping Address",
      value: address?.street ?? "Not Found",
    },
    {
      label: "City",
      value: address?.city ?? "Not Found",
    },
    {
      label: "Zip Code",
      value: address?.zipCode ?? "Not Found",
    },
    {
      label: "Payment Method",
      value: "Cash On Delivery",
    },
  ];
  const handleClick = async () => {
    const response = await createClientOrder();
    console.log(response);
    if (response?.success) {
      dispatch(clearCart());
      if (userOrderState?.orders !== null) {
        dispatch(addUserOrder(response?.order));
      }
      navigate("/", {
        state: {
          hasOrdered: true,
        },
        replace: true,
      });
    } else {
      toast.error(`Error :  ${response?.message || "Server Error"}`);
    }
  };
  return (
    <div className=" order-2 md:order-1 flex gap-4 flex-col">
      <UserHeader />
      <h3 className="text-3xl font-bold tracking-tight mb-8">
        Delivery Details
      </h3>
      <MissingInfoAlerts />
      <InfoGrid fields={fields} />
      <button
        className="px-8 py-2.5 bg-black w-full text-white my-4"
        onClick={handleClick}
      >
        CONFIRM ORDER
      </button>
    </div>
  );
}
