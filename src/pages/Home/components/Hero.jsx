import { assets } from "../../../assets/client/assets";

function Hero() {
  const { hero_img } = assets;
  return (
    <div className="relative flex flex-col sm:flex-row border border-gray-400 text-center ">
      {/* hero left side */}
      <div className="text-white sm:text-black absolute top-[50%] translate-y-[-50%]  left-3 md:static  md:translate-y-0 flex flex-col items-center justify-center py-10 sm:py-5 w-auto sm:w-1/2 ">
        <div className="flex items-center gap-2">
          <p className="w-8 md:w-11 h-[2px] bg-white sm:bg-black "></p>
          <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
        </div>
        <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed font-bold tracking-tighter">
          LATEST ARRIVALS
        </h1>
        <div className=" flex items-center gap-2">
          <p className="font-medium text-sm md:text-base">SHOP NOW</p>
          <p className="w-8 md:w-11 h-[2px]  bg-white sm:bg-black  "></p>
        </div>
      </div>
      {/* hero right side */}
      <img src={hero_img} className="w-full md:w-1/2" alt="" />
    </div>
  );
}

export default Hero;
