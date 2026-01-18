import { returnImgUrl } from "@/lib/utils";

export default function ProductImage({ mainImg, setMainImg, product }) {
  return (
    <div className="flex flex-col-reverse gap-4 justify-center lg:flex-row">
      <div className="grid grid-cols-4 lg:grid-rows-4 lg:grid-cols-none lg:h-[500px] gap-2 h-[100px] ">
        {product?.mainImage && product?.additionalImages.length > 0
          ? product?.additionalImages.map((img) => {
              return img === mainImg ? null : (
                <img
                  key={img._id}
                  src={returnImgUrl(img.url)}
                  onClick={() => {
                    setMainImg(img.url);
                  }}
                  alt={img.altText}
                  className="w-full h-[100px] lg:h-full  object-cover cursor-pointer"
                />
              );
            })
          : null}
        {product?.mainImage && product?.additionalImages.length > 0 ? (
          <img
            src={returnImgUrl(product?.mainImage.url)}
            onClick={() => {
              setMainImg(product?.mainImage.url);
            }}
            alt={product?.mainImage.altText}
            className="w-full h-[100px] object-cover lg:h-full cursor-pointer"
          />
        ) : null}
      </div>
      {mainImg && (
        <img
          src={returnImgUrl(mainImg)}
          alt=""
          className="w-full lg:w-4/5  max-h-[500px] lg:max-h-full h-full"
        />
      )}
    </div>
  );
}
