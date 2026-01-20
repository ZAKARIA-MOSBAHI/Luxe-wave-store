import { Alert, AlertAction, AlertContent } from "@/components/ui/Alert";
import { useAuth } from "@/context/AuthProvider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MissingInfoAlerts() {
  const { user } = useAuth();
  const userAddressState = useSelector((state) => state.userAddress?.address);

  const navigate = useNavigate();
  const handleAlertClick = () => {
    navigate("/account");
  };
  return (
    <>
      {userAddressState ? null : (
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
