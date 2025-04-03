import DropdownIcon from "../../../assets/client/icons/DropdownIcon";
function Accordion({ children, title, openAccordion, toggleAccordion }) {
  return (
    <div>
      <button
        className="cursor-pointer flex items-center justify-between w-full p-4 font-medium  text-black border-b bg-gray-50/50 border-gray-200 gap-3"
        onClick={() => toggleAccordion(title)}
      >
        <span className=" text-lg font-medium uppercase">{title}</span>
        <DropdownIcon className={openAccordion[title] ? "rotate-180" : ""} />
      </button>

      {openAccordion && children}
    </div>
  );
}

export default Accordion;
