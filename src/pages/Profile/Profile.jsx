import { useAuth } from "@/context/AuthProvider";
import ProfileInfosSection from "./components/ProfileInfosSection";
import { useState } from "react";
import ProfileFormsDialog from "./components/ProfileFormsDialog";
import AddPhoneNumberForm from "./forms/AddNumberForm";
import AddAddressForm from "./forms/AddAddressForm";
import { useAddress } from "@/hooks/useAddress";

function Profile() {
  const { user } = useAuth();
  const { address } = useAddress();
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [adressDialogOpen, setAdressDialogOpen] = useState(false);

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
        fallback={address ? "" : "No Address is Found."}
        fallbackActionText={address ? "" : "Create One Now"}
        onFallbackClick={
          address ? null : () => setAdressDialogOpen(!adressDialogOpen)
        }
        fields={[
          {
            label: "Street",
            value: address?.street,
          },
          {
            label: "City",
            value: address?.city,
          },
          {
            label: "Country",
            value: address?.country,
          },
          {
            label: "Zip Code",
            value: address?.zipCode,
          },
        ]}
      />
    </div>
  );
}

export default Profile;
