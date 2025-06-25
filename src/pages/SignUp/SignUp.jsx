import SignUpForm from "@/forms/SignUpForm";

function SignUp({ setPageType }) {
  const togglePage = () => {
    setPageType("login");
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-white">
      <div className="flex items-center gap-4 w-full pt-8 pb-4 justify-center text-center text-2xl md:text-3xl mb-3">
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
        <h1 className="font-bold tracking-tighter">SIGN UP</h1>
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
      </div>
      <SignUpForm togglePage={togglePage} />
    </div>
  );
}

export default SignUp;
