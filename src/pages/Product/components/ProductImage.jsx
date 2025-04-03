export default function ProductImage({ mainImg, setMainImg, product }) {
  return (
    <div className="flex max-h-[500px] flex-col-reverse gap-4 justify-center lg:flex-row">
      <div className="flex lg:flex-col overflow-x-auto gap-2">
        {product.image && product.image.length > 0
          ? product.image.map((img, ind) => {
              return img === mainImg ? null : (
                <img
                  key={ind}
                  src={img}
                  onClick={() => {
                    setMainImg(img);
                  }}
                  alt=""
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
