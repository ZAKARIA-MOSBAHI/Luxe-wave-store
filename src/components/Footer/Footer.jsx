import { assets } from "../../assets/client/assets";
import IconsRow from "./components/IconsRow";
function Footer() {
  const { logoWhite } = assets;
  return (
    <footer className=" bg-black">
      <div className="border-b border-gray-400 flex flex-col md:grid grid-cols-3 gap-16 w-full px-4 py-20 max-w-[1152px] mx-auto">
        <div className="flex flex-col gap-4 text-center md:text-left ">
          <img src={logoWhite} alt="" className="w-32 mx-auto md:mx-0" />
          <p className="w-full text-gray-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse earum
            nisi, aliquam reiciendis fugit harum.
          </p>
          <IconsRow />
        </div>
        <div className="flex flex-col gap-4  text-center md:text-left ">
          <p className="text-xl font-medium text-white">CONTACT US</p>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li>Company@gmail.com</li>
            <li> 123 Street, New York</li>
            <li>+212 612 123 456</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center md:text-left ">
          <p className="text-xl text-white font-medium">SUBSCRIBE</p>
          <p className="text-gray-400">
            Enter your email to get notified about our latest news.
          </p>
          <input
            type="text"
            className="py-4 w-full border border-gray-400 placeholder:text-gray-300  px-4"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-center py-4 ">
          2025 Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
