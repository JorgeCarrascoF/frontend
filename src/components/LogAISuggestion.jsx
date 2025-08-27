import { useState } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiCreation } from "@mdi/js";
import { useQuery } from "@tanstack/react-query";
import { getLogReport } from "../queries/getLogReport";
import ReactMarkdowm from "react-markdown";

const LogAISuggestion = ({ logId, inactive = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: logReport,
    isLoading: isLoadingLogReport,
    isError: isErrorLogReport,
    isSuccess: isSuccessLogReport,
  } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogReport(logId),
  });

  console.log(logReport);

  return (
    <div
      className={`w-full m-2 border border-gray-200 bg-white rounded-2xl ${
        inactive ? "text-[#737373]" : "text-black"
      }`}
    >
      <div className="w-full p-4 px-6 cursor-pointer flex justify-between items-center">
        <h2 className="text-xl text-left font-semibold ml-2">
          Automated support with AI
        </h2>
        <div>
          {isOpen ? (
            <Button onClick={() => setIsOpen(false)}>Hide suggestion</Button>
          ) : (
            <Button onClick={() => setIsOpen(true)}>
              <Icon path={mdiCreation} size={1} className="mr-2" />
              Generate suggestion with AI
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border-t mx-4 border-gray-200">
          <div className="text-left my-5 px-10 prose min-w-full">
            {isSuccessLogReport && (
              <ReactMarkdowm>{logReport?.result?.report}</ReactMarkdowm>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogAISuggestion;
