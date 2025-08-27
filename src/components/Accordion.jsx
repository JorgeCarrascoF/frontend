import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const Accordion = ({
  title = "Accordion Title",
  children,
  inactive = false,
  button,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full m-2 border border-[#DBDBDB] bg-white ${
        inactive ? "text-[#737373]" : "text-black"
      } rounded-lg`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 py-4 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-[18px] text-left font-semibold ml-2">{title}</h2>
        {button ? (
          ""
        ) : (
          <Icon
            path={mdiChevronDown}
            size={1}
            className={`mr-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>
      {isOpen && (
        <div className="border-t mx-8 border-[#DBDBDB]">
          <div className="text-left my-5 mx-3 text-gray-500 leading-relaxed break-words">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
