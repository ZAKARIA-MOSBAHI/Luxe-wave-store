import idk from "../../../assets/client/images/idk.jpg";
import tshirts from "../../../assets/client/images/tshirts.jpg";

function Hero() {
  return (
    <div className="relative flex flex-col sm:flex-row border border-gray-400 text-center">
      {/* Left side with overlay and image */}
      <div className="relative w-full h-screen lg:w-1/2">
        {/* Image */}
        <img src={tshirts} className="w-full h-full object-cover" alt="" />

        {/* Right-to-left gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black  to-transparent opacity-70" />

        {/* Text content */}
        <div className="text-left absolute top-1/2 -translate-1/2 left-1/2 text-white flex flex-col  w-full max-w-[400px] z-1">
          <p className="">The Stevens Sports Coat Navy Blue Linen Surf</p>
          <h1 className="text-[50px] font-medium pb-8">Breezy By Design</h1>
          <button
            onClick={() => (location.href = "/collections/1")}
            className=" px-12 cursor-pointer py-4 w-fit text-black transition-all duration-300 bg-white"
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Right side image */}
      <img
        src={idk}
        className="w-full h-screen object-cover md:w-1/2 hidden lg:block"
        alt=""
      />
    </div>
  );
}

export default Hero;
