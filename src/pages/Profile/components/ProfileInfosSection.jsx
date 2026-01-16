import React from "react";

export default function ProfileInfosSection({ title, fields }) {
  return (
    <div className="pb-10">
      <h2 className="text-3xl font-bold tracking-tight my-10">{title}</h2>

      <div className="flex flex-col gap-4">
        {/* Fallback / error messages */}
        {fields.map(
          (field, index) =>
            !field.value && field.fallback && (
              <span
                key={index}
                className=" text-sm  sm:text-base block py-2 px-4 md:py-2 md:px-4 text-sm font-normal text-red-900 bg-red-100 rounded-md"
              >
                {field.fallback}
                {field.onFallbackClick && (
                  <button
                    className="font-bold underline sm:ps-2"
                    onClick={field.onFallbackClick}
                  >
                    {field.fallbackActionText || "Add Now"}
                  </button>
                )}
              </span>
            )
        )}

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {fields.map(
            (field, index) =>
              field.value && (
                <React.Fragment key={index}>
                  <span className="text-sm  sm:text-base col-span-3 text-[#222222] font-medium">
                    {field.label}
                  </span>
                  <span className="text-sm  sm:text-base col-span-9 text-[#666666] font-normal">
                    {field.value}
                  </span>
                </React.Fragment>
              )
          )}
        </div>
      </div>
    </div>
  );
}
