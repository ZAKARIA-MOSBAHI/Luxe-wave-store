import { Link } from "react-router-dom";
import { assets } from "../../assets/client/assets";
import IconsRow from "./components/IconsRow";
import { Mail, MapPin, Phone } from "lucide-react";
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
          <p className="text-xl font-medium text-white">Quick Links</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <Link to={"/"} className="hover:underline">
              Home
            </Link>
            <Link to={"/collections/1"} className="hover:underline">
              Collections
            </Link>
            <Link to={"/about"} className="hover:underline">
              About
            </Link>
            <Link to={"/contact"} className="hover:underline">
              Contact
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="text-xl font-semibold text-white">Get in Touch</p>
          <ul className="flex flex-col gap-4 text-gray-400 ">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@company.com" className="hover:underline">
                contact@company.com
              </a>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin className="w-4 h-4" />
              <span>123 Main Street, New York, NY</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="w-4 h-4" />
              <a href="tel:+212612123456" className="hover:underline">
                +212 612 123 456
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-center py-4 ">
          © {new Date().getFullYear()} LuxeWave. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
