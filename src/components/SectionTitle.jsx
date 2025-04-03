import Title from "./Title";

function SectionTitle({
  title,
  subtitle = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,ducimus.",
}) {
  return (
    <div className="flex flex-col my-10 ">
      <Title title={title} />

      <p className="flex justify-center text-xs text-center text-gray-500 sm:text-sm md:text-base  mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;
