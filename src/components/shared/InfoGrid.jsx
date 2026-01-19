import React from "react";

export default function InfoGrid({ fields }) {
  return (
    <div className="grid grid-cols-12 gap-6 md:gap-10 ">
      {fields.map(
        (field, index) =>
          field.value && ( //but this doesn't return this
            <React.Fragment key={index}>
              <span className="text-sm  sm:text-base col-span-3 text-[#222222] font-medium ">
                {field.label}
              </span>
              <span className="text-sm  sm:text-base col-span-9 text-[#666666] font-normal ">
                {field.value}
              </span>
            </React.Fragment>
          ),
      )}
    </div>
  );
}
