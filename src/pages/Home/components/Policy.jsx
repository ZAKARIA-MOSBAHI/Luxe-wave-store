import { assets } from "../../../assets/client/assets";
function Policy() {
  const { exchange_icon, quality_icon, support_img } = assets;
  return (
    <div className="py-8 md:py-10  md:my-15 my-8 flex flex-col sm:flex-row justify-evenly gap-12 sm:gap-2 text-center text-xs sm:text-base md:text-xl text-gray-700">
      <div className="flex flex-col gap-1">
        <img src={exchange_icon} alt="" className="w-12 mb-5 m-auto" />
        <p className="font-semibold">Lorem, ipsum.</p>
        <p className="text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <img src={quality_icon} alt="" className="w-12 mb-5 m-auto mx" />
        <p className="font-semibold ">Lorem, ipsum.</p>
        <p className="text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <img src={support_img} alt="" className="w-12 mb-5 m-auto" />
        <p className="font-semibold">Lorem, ipsum.</p>
        <p className="text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
    </div>
  );
}

export default Policy;
