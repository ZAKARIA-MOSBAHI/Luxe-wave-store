import React, { useState } from "react";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = React.useState("desktop");
  const [width, setWidth] = useState(0);
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);

      if (width <= 480) {
        console.log("It's a cellphone");
        setDeviceType("cellphone");
      } else if (width <= 768) {
        console.log("It's a tablet");
        setDeviceType("tablet");
      } else {
        console.log("It's a desktop");
        setDeviceType("desktop");
      }
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { deviceType, width };
};
