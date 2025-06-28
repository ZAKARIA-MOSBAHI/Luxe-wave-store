import { assets } from "@/assets/client/assets";

export default function RegisterPageLayout({ children, title }) {
  const { login_image, logo } = assets;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 w-full pt-8 pb-4 justify-center text-center text-2xl md:text-3xl">
          <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
          <h1 className="font-bold text-[48px] capitalize tracking-tighter">
            {title}
          </h1>
          <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
        </div>
        {children}
      </div>
      <div className="w-full relative hidden md:block h-full rounded-4xl overflow-hidden">
        <img
          src={login_image}
          alt=""
          className="w-full object-center object-cover"
        />
        <img
          src={logo}
          className="absolute top-4 right-4 object-contain w-42"
          alt="brand logo"
        />
      </div>
    </div>
  );
}
