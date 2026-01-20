import UserHeader from "../UserHeader";
import MissingInfoAlerts from "../MissingInfoAlerts";
import InfoGrid from "@/components/shared/InfoGrid";
import { useSelector } from "react-redux";
import { useAuth } from "@/context/AuthProvider";

export default function DeliverySection() {
  const { user } = useAuth();
  const userAddressState = useSelector((state) => state.userAddress?.address);

  const fields = [
    {
      label: "Country",
      value: userAddressState?.country ?? "Not Found",
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
      value: userAddressState?.street ?? "Not Found",
    },
    {
      label: "City",
      value: userAddressState?.city ?? "Not Found",
    },
    {
      label: "Zip Code",
      value: userAddressState?.zipCode ?? "Not Found",
    },
    {
      label: "Payment Method",
      value: "Cash On Delivery",
    },
  ];
  const handleClick = () => {
    alert("ORDER CONFIRMED! implement logic later");
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
