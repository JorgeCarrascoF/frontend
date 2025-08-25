import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getStatusRegister from "../queries/getStatusRegister";
import { maxLimitInteger } from "../utils/maxLimitInteger";
import StatusRegisterTable from "./StatusRegisterTable";

const LogStatusRegister = ({ logId, inactive = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: statusRegister, isLoading, isError, error } = useQuery({
    queryFn: () => getStatusRegister(logId, { limit: maxLimitInteger }),
    queryKey: ["statusRegister", logId],
  });

  console.log(statusRegister);

  return (
    <div
      className={`w-full m-2 border border-gray-200 bg-white ${
        inactive ? "text-[#737373]" : "text-black"
      } rounded-2xl `}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 px-6 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl text-left font-semibold ml-2">Log History</h2>
        <Icon
          path={mdiChevronDown}
          size={1.5}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t mx-4 border-gray-200">
          {/* <p className="text-left my-5 ml-3 text-gray-500 leading-relaxed">
            {description
              ? description !== "error description"
                ? description
                : "No description available"
              : "No description available"}
          </p> */}
          {statusRegister && <StatusRegisterTable statusRegister={statusRegister.data} />}
        </div>
      )}
    </div>
  );
};

export default LogStatusRegister;
