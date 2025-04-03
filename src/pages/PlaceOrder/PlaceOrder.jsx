import { useRef, useState } from "react";
import { assets } from "../../assets/client/assets";
export default function PlaceOrder() {
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    dropdown_icon,
    paypal_icon,
    credit_card_icon,
    cash_on_delivery_icon,
  } = assets;
  const formDataRef = useRef({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current[name] = value; //{name : value}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      console.log("no payment method");
      return;
    }
    formDataRef.current["payment_method"] = paymentMethod;
    console.log(formDataRef.current);
  };
  return (
    <div className="sm:p-4 md:p-12 bg-[#F1F4F9]">
      <div className="flex flex-col md:flex-row  items-center justify-between">
        <form onSubmit={handleSubmit} className="bg-white p-8 w-full">
          <h1 className="text-xl sm:text-xl mt-4 mb-6 font-medium">
            SHIPPING INFORMATIONS
          </h1>
          <div>
            <p className="text-base font-medium my-2">FULL NAME</p>
            <input
              type="text"
              className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
              placeholder="your first and last name"
              onChange={handleChange}
              name="full_name"
            />
          </div>
          <div>
            <p className="text-base font-medium my-2">PHONE NUMBER</p>
            <input
              type="text"
              inputMode="numeric"
              className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
              placeholder="your first and last name"
              onChange={handleChange}
              name="phone_number"
            />
          </div>
          <div className="flex justify-between flex-wrap sm:flex-nowrap sm:gap-4">
            <div className="w-full sm:w-1/2">
              <p className="text-base font-medium my-2">CITY</p>
              <input
                type="text"
                className=" p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
                placeholder="Enter your city"
                onChange={handleChange}
                name="city"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <p className="text-base font-medium my-2">REGION</p>
              <input
                type="text"
                className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
                placeholder="Enter the region of your city"
                onChange={handleChange}
                name="region"
              />
            </div>
          </div>
          <div>
            <p className="text-base font-medium my-2">STREET ADDRESS</p>
            <input
              type="text"
              className="p-3 w-full border outline-hidden placeholder:text-gray-300 focus:ring-1 focus:ring-black"
              placeholder="123 Example Street"
              onChange={handleChange}
              name="street_address"
            />
          </div>
          <div>
            <p className="text-base font-medium my-4">PAYMENT METHOD</p>
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center ">
              {/* SELECT MENU FOR BIG SCREENS  */}
              <div
                onClick={() =>
                  (formDataRef.current["payment_method"] = "cash on delivery")
                }
                className="hidden sm:flex sm:min-h-[150px] md:min-h-[200px] hover:bg-gray-50 transition-all duration-300 border font-medium flex flex-col items-center justify-center  p-8 cursor-pointer"
              >
                <img
                  src={cash_on_delivery_icon}
                  alt=""
                  className="w-32 h-auto"
                />
              </div>
              <div
                onClick={() =>
                  (formDataRef.current["payment_method"] = "credit_card")
                }
                className="hidden sm:flex sm:min-h-[150px] md:min-h-[200px] hover:bg-gray-50 transition-all duration-300 border font-medium flex flex-col items-center justify-center  p-8 cursor-pointer"
              >
                <img src={credit_card_icon} alt="" className="w-32 h-auto" />
              </div>
              <div
                onClick={() =>
                  (formDataRef.current["payment_method"] = "paypal")
                }
                className="hidden sm:flex sm:min-h-[150px] md:min-h-[200px] hover:bg-gray-50 transition-all duration-300 border font-medium flex flex-col items-center justify-center p-8 cursor-pointer"
              >
                <img src={paypal_icon} alt="" className="w-36 h-auto" />
              </div>
              {/* SELECT MENU FOR SMALLER SCREENS */}
              <div
                onClick={() => setOpenSelectMenu(!openSelectMenu)}
                className={`sm:hidden p-3 w-full border flex items-center justify-between cursor-pointer focus:ring-1 focus:ring-black`}
              >
                <span className="font-medium text-sm">SELECT YOUR OPTION</span>
                <img
                  src={dropdown_icon}
                  alt=""
                  className={`${
                    openSelectMenu ? "" : "rotate-180"
                  } sm:hidden w-4`}
                />
              </div>
              <div className={`${openSelectMenu ? "" : "hidden"} sm:hidden `}>
                <ul className="border rounded-xs">
                  <li
                    onClick={() => {
                      setPaymentMethod("cash on delivery");
                    }}
                    className={` ${
                      paymentMethod === "cash on delivery"
                        ? "bg-black text-white"
                        : ""
                    } flex justify-between items-center p-4 border-b text-sm cursor-pointer transition-all duration-300 hover:bg-black hover:text-white`}
                  >
                    CASH ON DELIVERY
                    {paymentMethod === "cash on delivery" && (
                      <svg
                        className="w-6"
                        viewBox="0 0 20 20"
                        fill="white"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setPaymentMethod("credit card");
                    }}
                    className={` ${
                      paymentMethod === "credit card"
                        ? "bg-black text-white"
                        : ""
                    } flex justify-between items-center p-4 border-b text-sm cursor-pointer transition-all duration-300 hover:bg-black hover:text-white`}
                  >
                    DEBIT CARD
                    {paymentMethod === "credit card" && (
                      <svg
                        className="w-6"
                        viewBox="0 0 20 20"
                        fill="white"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      setPaymentMethod("paypal");
                    }}
                    className={` ${
                      paymentMethod === "paypal" ? "bg-black text-white" : ""
                    } flex justify-between items-center p-4 border-b text-sm cursor-pointer transition-all duration-300 hover:bg-black hover:text-white`}
                  >
                    PAYPAL
                    {paymentMethod === "paypal" && (
                      <svg
                        className="w-6"
                        viewBox="0 0 20 20"
                        fill="white"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button className="px-8 py-2.5 bg-black w-full text-white my-4">
            CONFIRM ORDER
          </button>
        </form>
      </div>
    </div>
  );
}
