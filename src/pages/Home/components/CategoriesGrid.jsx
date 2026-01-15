 const CategoriesGrid = ({ firstColSpan, secondColSpan, firstImg, secondImg }) => {
  return (
    <div className="grid gap-6 grid-cols-12 max-w-[1200px] w-full mx-auto items-center">
      <div className={`${firstColSpan} bg-gray-400 h-[300px] rounded-[20px] overflow-hidden`}>
        <img src={firstImg} alt="" className="h-full w-full object-cover " />
      </div>
      <div className={`${secondColSpan} bg-gray-400 h-[300px] rounded-[20px] overflow-hidden`}>
        <img src={secondImg} alt="" className="h-full w-full object-cover " />
      </div>
    </div>
  );
};
export default CategoriesGrid;