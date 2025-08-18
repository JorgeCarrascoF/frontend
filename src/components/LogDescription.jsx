import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const LogDescription = ({
  description = "There is no description for this log.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full m-2 border-[1px] border-gray-200 bg-white rounded-2xl ">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 px-6 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl text-left font-semibold ml-2">Details</h2>
        <Icon
          path={mdiChevronDown}
          size={1.5}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t-[1px] mx-4 border-gray-200">
          <p className="text-left my-5 ml-3 text-gray-500 leading-relaxed">
            {description ? description : "No description available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LogDescription;
