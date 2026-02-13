import { Alert, AlertAction, AlertContent } from "@/components/ui/Alert";
import { useAuth } from "@/context/AuthProvider";
import { useUserAddress } from "@/hooks/client/useUserAddress";
import { useNavigate } from "react-router-dom";

export default function MissingInfoAlerts() {
  const { user } = useAuth();
  const { address } = useUserAddress();

  const navigate = useNavigate();
  const handleAlertClick = () => {
    navigate("/account");
  };
  return (
    <>
      {address ? null : (
        <Alert variant="error">
          <AlertContent>Address Is Required</AlertContent>

          <AlertAction onClick={handleAlertClick}>Create One Now.</AlertAction>
        </Alert>
      )}

      {user?.phone ? null : (
        <Alert variant="error">
          <AlertContent>Phone Number Is Required</AlertContent>

          <AlertAction onClick={handleAlertClick}>Create One Now.</AlertAction>
        </Alert>
      )}
    </>
  );
}
