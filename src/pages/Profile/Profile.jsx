import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileInfosSection from "./components/ProfileInfosSection";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }
  return (
    <div className="w-full">
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
            onFallbackClick: () => console.log("Open phone form"),
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
            onFallbackClick: () => console.log("Open address form"),
          },
        ]}
      />
    </div>
  );
}

export default Profile;
