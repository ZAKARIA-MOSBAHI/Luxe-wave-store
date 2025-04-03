import React from "react";

export default function Badge({ content, color }) {
  //since tailwing doesn't support dynamic class names, we use a conditional statement to add the class
  const backgroundColors = {
    red: "bg-red-500",
    green: "bg-green-500",
  };

  return (
    <span
      className={`absolute top-2 left-2 inline-flex items-center rounded-md ${backgroundColors[color]} px-2 py-1 text-sm font-medium   text-white`}
    >
      {content}
    </span>
  );
}
