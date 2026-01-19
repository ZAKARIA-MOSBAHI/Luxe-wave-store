import InfoGrid from "@/components/shared/InfoGrid";
import { Alert, AlertAction, AlertContent } from "@/components/ui/Alert";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthProvider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderItem from "./components/OrderItem";
export default function PlaceOrder() {
  // next : use address redux state and remove type checking for address alert
  const { user } = useAuth();
  const cartState = useSelector((state) => state.cart.data);
  const addressState = useSelector((state) => state.userAddress.address);
  console.log(cartState);
  const navigate = useNavigate();
  const fields = [
    {
      label: "Country",
      value: user?.addressId?.country ?? "Not Found",
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
      value: user?.addressId?.street ?? "Not Found",
    },
    {
      label: "City",
      value: user?.addressId?.city ?? "Not Found",
    },
    {
      label: "Zip Code",
      value: user?.addressId?.zipCode ?? "Not Found",
    },
    {
      label: "Payment Method",
      value: "Cash On Delivery",
    },
  ];
  // since only two possible data could be missing (address , phone )
  // we'll create the errors manualy
  const handleAlertClick = () => {
    // the user can add missing data in this page
    navigate("/account");
  };
  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <section className="space-y-10 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" order-2 md:order-1 flex gap-4 flex-col">
          <div className="flex justify-between items-center pb-4 border-b border-b-1 border-gray-200">
            <Avatar className="h-8 w-8 cursor-pointer bg-gray-100 text-lg flex justify-center items-center">
              <AvatarFallback className="">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-gray-600 text-sm md:text-base">{user?.email}</p>
          </div>
          <h3 className="text-3xl font-bold tracking-tight mb-8">
            Delivery Details
          </h3>
          {/* means obj not populated  */}
          {typeof user?.addressId === "object" ? null : (
            <Alert variant="error">
              <AlertContent>Address Is Required</AlertContent>

              <AlertAction onClick={handleAlertClick}>
                Create One Now.
              </AlertAction>
            </Alert>
          )}

          {user?.phone ? null : (
            <Alert variant="error">
              <AlertContent>Phone Number Is Required</AlertContent>

              <AlertAction onClick={handleAlertClick}>
                Create One Now.
              </AlertAction>
            </Alert>
          )}
          <InfoGrid fields={fields} />
          <button className="px-8 py-2.5 bg-black w-full text-white my-4">
            CONFIRM ORDER
          </button>
        </div>
        <div className="order-1 md:order-2 bg-[#F1F4F9] p-8 w-full">
          <h3 className="text-3xl font-bold tracking-tight mb-8">
            Order Items
          </h3>
          {cartState?.items.length > 0
            ? cartState?.items.map((item, index) => {
                return <OrderItem item={item} key={index} />;
              })
            : null}
          <p className="font-bold">Total : {cartState?.total} MAD</p>
        </div>
      </div>
      {/* checkout call to action (makes api call and sends email ? )  */}
    </section>
  );
}
