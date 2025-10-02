import { useEffect } from "react";

export default function ProductImage({ mainImg, setMainImg, product }) {
  useEffect(() => {
    console.log("the product is ");
    console.log(product);
  }, []);
  return (
    <div className="flex max-h-[500px] flex-col-reverse gap-4 justify-center lg:flex-row">
      <div className="flex lg:flex-col overflow-x-auto gap-2">
        {product?.mainImage && product?.additionalImages.length > 0
          ? product?.additionalImages.map((img) => {
              return img === mainImg ? null : (
                <img
                  key={img._id}
                  src={img.url}
                  onClick={() => {
                    setMainImg(img.url);
                  }}
                  alt={img.altText}
                  className="w-[24%] lg:w-full sm:mb-3 shrink-0 cursor-pointer h-auto"
                />
              );
            })
          : null}
      </div>
      {mainImg && (
        <img src={mainImg} alt="" className="w-full lg:w-4/5 h-auto" />
      )}
    </div>
  );
}
