import { Button } from "@/admin/components/ui/Button";
import { assets } from "@/assets/client/assets";
import { ArrowUpRight } from "lucide-react";

function Hero() {
  const { banner } = assets;
  return (
    <div className="relative overflow-hidden rounded-4xl mx-2 md:mx-6 mt-4">
      <img
        src={banner}
        className="w-full h-[calc(100vh-75px)] object-cover "
        alt=""
      />
      <div className="bg-gradient-to-b from-black/0   to-black absolute top-0 left-0 w-full h-full"></div>
      <div className="w-full mx-auto gap-4 md:gap-0 z-[2] grid md:grid-cols-2 items-end  bottom-12 absolute  place-items-end px-4 md:px-8">
        <h1 className="uppercase text-[42px]  md:text-[60px]  text-white/80 font-bold tracking-tight leading-tight  ">
          the future of fashion is here
        </h1>
        <Button
          className=" uppercase px-4 py-2 h-auto bg-white text-black md:text-[32px] w-fit"
          variant="sharp"
          size="icon"
        >
          Shop Now
          <ArrowUpRight className="md:size-8 size-5" />
        </Button>
      </div>
    </div>
  );
}

export default Hero;
