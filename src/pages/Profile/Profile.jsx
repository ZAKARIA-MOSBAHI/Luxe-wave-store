import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileInfosSection from "./components/ProfileInfosSection";
import { useState } from "react";
import ProfileFormsDialog from "./components/ProfileFormsDialog";
import AddPhoneNumberForm from "./forms/AddNumberForm";
import AddAddressForm from "./forms/AddAdressForm";

function Profile() {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [adressDialogOpen, setAdressDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }
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
        <AddPhoneNumberForm />
      </ProfileFormsDialog>

      <ProfileFormsDialog
        dialogTitle={"Add Your Shipping Adress"}
        dialogDescription={
          "This address will be used to deliver your orders accurately and on time."
        }
        dialogOpen={adressDialogOpen}
        setDialogOpen={setAdressDialogOpen}
      >
        <AddAddressForm />
      </ProfileFormsDialog>
      <ProfileInfosSection
        title="Account Details"
        fields={[
          {
            label: "Name",
            value: user.name,
          },
          {
            label: "Email",
            value: user.email,
          },
          {
            label: "Phone",
            value: user.phone,
            fallback: "No Phone Number is Found.",
            fallbackActionText: "Add One Now",
            onFallbackClick: () => setPhoneDialogOpen(!phoneDialogOpen),
          },
        ]}
      />

      <ProfileInfosSection
        title="Addresses"
        fields={[
          {
            label: "Address Id",
            value: user.adressId,
            fallback: "No Address is Found.",
            fallbackActionText: "Create One Now",
            onFallbackClick: () => setAdressDialogOpen(!adressDialogOpen),
          },
        ]}
      />
    </div>
  );
}

export default Profile;
