import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileInfosSection from "./components/ProfileInfosSection";
import { useEffect, useState } from "react";
import ProfileFormsDialog from "./components/ProfileFormsDialog";
import AddPhoneNumberForm from "./forms/AddNumberForm";
import AddAddressForm from "./forms/AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { getClientAddress } from "@/services/address.service";
import { setUserAddress } from "@/app/slices/addressSlice";

function Profile() {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [adressDialogOpen, setAdressDialogOpen] = useState(false);

  const { user } = useAuth();
  const UserAddressState = useSelector((state) => state.userAddress?.address);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressResponse = await getClientAddress();
        if (addressResponse.success) {
          dispatch(setUserAddress(addressResponse.address));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, [dispatch]);

  return (
    <div className="w-full">
      <ProfileFormsDialog
        dialogTitle={"Add Your Phone Number"}
        dialogDescription={
          "Your phone number helps us secure your account and contact you when needed."
        }
        dialogOpen={phoneDialogOpen}
        setDialogOpen={setPhoneDialogOpen}
      >
        <AddPhoneNumberForm setDialogOpen={setPhoneDialogOpen} />
      </ProfileFormsDialog>

      <ProfileFormsDialog
        dialogTitle={"Add Your Shipping Adress"}
        dialogDescription={
          "This address will be used to deliver your orders accurately and on time."
        }
        dialogOpen={adressDialogOpen}
        setDialogOpen={setAdressDialogOpen}
      >
        <AddAddressForm setDialogOpen={setAdressDialogOpen} />
      </ProfileFormsDialog>
      <ProfileInfosSection
        fallback={user?.phone ? null : "No Phone Number is Found."}
        fallbackActionText={user?.phone ? null : "Add One Now"}
        onFallbackClick={
          user?.phone ? null : () => setPhoneDialogOpen(!phoneDialogOpen)
        }
        title="Account Details"
        fields={[
          {
            label: "Name",
            value: user?.name,
          },
          {
            label: "Email",
            value: user?.email,
          },
          {
            label: "Phone",
            value: user?.phone,
          },
        ]}
      />

      <ProfileInfosSection
        title="Shipping Address"
        fallback={UserAddressState ? "" : "No Address is Found."}
        fallbackActionText={UserAddressState ? "" : "Create One Now"}
        onFallbackClick={
          UserAddressState ? null : () => setAdressDialogOpen(!adressDialogOpen)
        }
        fields={[
          {
            label: "Street",
            value: UserAddressState?.street,
          },
          {
            label: "City",
            value: UserAddressState?.city,
          },
          {
            label: "Country",
            value: UserAddressState?.country,
          },
          {
            label: "Zip Code",
            value: UserAddressState?.zipCode,
          },
        ]}
      />
    </div>
  );
}

export default Profile;
