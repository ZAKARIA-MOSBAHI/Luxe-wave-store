import UserHeader from "../UserHeader";
import MissingInfoAlerts from "../MissingInfoAlerts";
import InfoGrid from "@/components/shared/InfoGrid";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUserAddress } from "@/hooks/client/useUserAddress";
import { useUserOrders } from "@/hooks/client/useUserOrders";
import { useUserCart } from "@/hooks/client/useUserCart";

export default function DeliverySection() {
  const { user } = useAuth();
  const { createUserOrder } = useUserOrders();
  const { clearCartInStore } = useUserCart();
  const navigate = useNavigate();
  const { address } = useUserAddress();

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
    const response = await createUserOrder();
    if (response.success) {
      clearCartInStore();

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
