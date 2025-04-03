function NewsLetter() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="py-8 md:py-10  md:my-15 my-8  text-center ">
      <p className="prata-regular text-2xl font-medium text-gray-800">
        Subscribe now & get 10% off your first purchase
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center my-6  gap-3 mx-auto border pl-3 "
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          id=""
          className="outline-hidden sm:flex-1 w-full "
          required
        />
        <button
          type="submit"
          className="bg-black text-sm text-white px-10 py-4"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
