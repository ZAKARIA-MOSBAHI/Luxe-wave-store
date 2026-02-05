function SectionTitle({ title, isWhite }) {
  return (
    <div
      className={` flex justify-between items-center ${isWhite ? "text-white" : ""}`}
    >
      <div className="flex items-center gap-2  md:gap-4  pb-4 md:pb-8 justify-center text-center">
        <h1 className="typography-h2">{title}</h1>
        <p
          className={`${isWhite ? "bg-white" : "bg-black"} w-10  lg:w-14 h-[2px]`}
        ></p>
      </div>
    </div>
  );
}

export default SectionTitle;
