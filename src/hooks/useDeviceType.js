import React, { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      if (newWidth <= 480) {
        setDeviceType("cellphone");
      } else if (newWidth <= 768) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("Device type is:", deviceType);
  }, [deviceType]);

  return { deviceType, width };
};
