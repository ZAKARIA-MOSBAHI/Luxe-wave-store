import { assets } from "../../assets/client/assets";

function Contact() {
  const { contact_img } = assets;
  return (
    <div>
      <div className="flex items-center gap-4  pt-8 pb-4 justify-center text-center text-2xl md:text-3xl mb-3">
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
        <h1 className="prata-regular">CONTACT US</h1>
        <p className="w-8 lg:w-11 h-[2px] bg-black"></p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center  gap-4 sm:justify-between">
        <img src={contact_img} className="w-1/2  max-h-[400px] " alt="" />
        <div>
          <div className="mb-2">
            <h1 className=" text-2xl sm:text-3xl font-medium mb-2">
              GET IN TOUCH
            </h1>
            <p className="text-gray-600 ">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to say hello, feel free to reach out.
            </p>
          </div>
          <div className="mb-2">
            <h1 className=" text-lg sm:text-xl font-medium mb-1">OUR EMAIL</h1>
            <p className="text-gray-600 ">
              Send us a message anytime at :{" "}
              <span className="font-medium text-black">
                email11333@gmail.com
              </span>
              , and we'll get back to you within 24-48 hours.
            </p>
          </div>
          <div className="mb-2">
            <h1 className=" text-lg sm:text-xl font-medium mb-1">OUR PHONE</h1>
            <p className="text-gray-600 ">
              We're available Monday through Friday, 9 AM - 6 PM. Feel free to
              Call {"  "}
              <span className="font-medium text-black">06482392084</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
