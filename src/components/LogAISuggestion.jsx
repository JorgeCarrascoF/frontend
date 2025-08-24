import { useState } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiCreation } from "@mdi/js";

const LogAISuggestion = ({ logId, inactive = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-full m-2 border border-gray-200 bg-white rounded-2xl ${inactive ? "text-[#737373]" : "text-black"}`}>
      <div className="w-full p-4 px-6 cursor-pointer flex justify-between items-center">
        <h2 className="text-xl text-left font-semibold ml-2">
          Automated support with AI
        </h2>
        <div>
          {isOpen ? (
            <Button onClick={() => setIsOpen(false)}>Hide suggestion</Button>
          ) : (
            <Button onClick={() => setIsOpen(true)}>
              <Icon path={mdiCreation} size={1} />
              Generate suggestion with AI
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border-t mx-4 border-gray-200">
          <p className="text-left my-5 ml-3 text-gray-500 leading-relaxed">
            This is a placeholder for AI suggestions related to the log. It can
            include recommendations for actions, insights based on the log data,
            or any other relevant information that can assist in resolving the
            issue.
          </p>
        </div>
      )}
    </div>
  );
};

export default LogAISuggestion;
