import { useSelector } from "react-redux";

function Profile() {
  const { data } = useSelector((state) => state.user);

  if (data === null) {
    window.location.href = "/register";
    return null;
  }

  return <div>profile</div>;
}

export default Profile;
