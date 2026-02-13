import { returnImgUrl } from "@/utils/returnImgUrl";

export default function OrderItem({ item }) {
  return (
    <>
      <div className="flex w-full gap-4 relative ">
        <img
          src={returnImgUrl(item?.productId.mainImage.url)}
          alt=""
          className="w-36 rounded-lg h-[100px] object-cover"
        />
        <div className="w-full flex-col flex gap-2 ">
          <div className="flex font-medium justify-between items-center flex-wrap text-sm sm:text-base">
            <h1>{item?.productId.name}</h1>
            <p className="">{item?.productId.price} MAD</p>
          </div>

          <p className="text-gray-600">
            Quantity :{" "}
            <span className="font-medium text-black"> {item?.quantity}</span>
          </p>
          <p className="text-gray-600">
            Size :{" "}
            <span className="font-medium text-black">{item?.itemSize}</span>
          </p>
        </div>
      </div>

      <div className="h-[1.5px] bg-gray-200 sm:my-6 my-4"></div>
    </>
  );
}
