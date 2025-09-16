import React from "react";
import { Input } from "../ui/Input";
const sizeOptions = ["S", "M", "L", "XL", "XXL"];
function SizeSelector({ sizeValues, handleSizeChange, sizeErrorMsgs }) {
  return (
    <div className="grid gap-6 grid-cols-5">
      {sizeOptions.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {size}
          </label>
          <Input
            className=""
            onChange={(e) => handleSizeChange(size, e.target.value)}
            value={sizeValues[size]}
            type="number"
            step="1"
            min="0"
          />
          {sizeErrorMsgs && sizeErrorMsgs[size] && (
            <p className="text-xs text-red-500 mt-1">{sizeErrorMsgs[size]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default SizeSelector;
