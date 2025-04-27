function Title({ title }) {
  return (
    <div className="flex items-center gap-4  pt-8 pb-4 justify-center text-center mb-3">
      <p className="w-8  hidden md:block lg:w-11 h-[2px] bg-black"></p>
      <h1 className="tracking-tighter font-bold text-mobile-h2 md:text-desktop-h2">
        {title}
      </h1>
      <p className="w-8  hidden md:block lg:w-11 h-[2px] bg-black"></p>
    </div>
  );
}

export default Title;
