import RegisterPageLayout from "@/components/Layout/RegisterPageLayout";
import SignUpForm from "@/forms/SignUpForm";

function SignUp() {
  return (
    <RegisterPageLayout title={"create account"}>
      <SignUpForm />
    </RegisterPageLayout>
  );
}

export default SignUp;
