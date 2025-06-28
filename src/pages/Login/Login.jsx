import LoginForm from "@/forms/LoginForm";
import RegisterPageLayout from "@/components/Layout/RegisterPageLayout";

export default function Login() {
  return (
    <RegisterPageLayout title={"welcome back"}>
      <LoginForm />
    </RegisterPageLayout>
  );
}
