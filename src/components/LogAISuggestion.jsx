import { useEffect, useState } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiCreation } from "@mdi/js";
import { useQuery } from "@tanstack/react-query";
import { getLogReport } from "../queries/getLogReport";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/atom-one-dark.css';

const LogAISuggestion = ({ logId, inactive = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [report, setReport] = useState("");

  const {
    data: logReport,
    isLoading: isLoadingLogReport,
    isError: isErrorLogReport,
    isSuccess: isSuccessLogReport,
  } = useQuery({
    queryKey: ["logReport", logId],
    queryFn: () => getLogReport(logId),
  });

  useEffect(() => {
    if (isSuccessLogReport && logReport?.result?.report) {
      setReport(logReport?.result?.report);
    }
  }, [isSuccessLogReport, logReport]);

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
          <div className="text-left my-5 px-10 prose min-w-full prose-code:text-[16px]">
            {report && (
              <ReactMarkdown rehypePlugins={rehypeHighlight}>{report}</ReactMarkdown>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogAISuggestion;
