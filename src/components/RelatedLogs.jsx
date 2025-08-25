import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { getRelatedLogs } from "../queries/getRelatedLogs";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import RelatedLogsTable from "./RelatedLogsTable";

const RelatedLogs = ({ log, inactive = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const errorSignature = log.error_signature;
  const {
    data: relatedLogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getRelatedLogs({ error_signature: errorSignature }),
    queryKey: ["relatedLogs", errorSignature],
    enabled: !!errorSignature,
  });

  const noErrorSignature = !errorSignature;

  const columns = [
    { key: "id", label: "ID", width: "w-[25%]" },
    { key: "status", label: "Status", width: "w-[15%]" },
    { key: "message", label: "Error message", width: "w-[50%]" },
    { key: "environment", label: "Environment", width: "w-[10%]" },
  ];

  console.log("Related logs data:", relatedLogs);

  return (
    <div
      className={`w-full m-2 border border-gray-200 bg-white rounded-2xl ${
        inactive ? "text-[#737373]" : "text-black"
      }`}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 px-6 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl text-left font-semibold ml-2">Related logs</h2>
        <Icon
          path={mdiChevronDown}
          size={1.5}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        // <div className="border-t mx-4 border-gray-200">
        //   <table className="mt-3">
        //     <thead className="bg-[#fafafa]">
        //       <tr className="[&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium [&>th]:text-sm [&>th]:border-b [&>th]:border-gray-200">
        //         {columns.map((col, i) => (
        //           <th
        //             key={col.key}
        //             className={`${col.width ?? ""} ${
        //               i === 0 ? "rounded-tl-md" : ""
        //             } ${i === columns.length - 1 ? "rounded-tr-md" : ""}`}
        //           >
        //             {col.label}
        //           </th>
        //         ))}
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <RelatedLogRow log={log} />
        //       {/* {data.map((row) => (
        //         <LogRow key={row.id} log={row} onRowClick={onRowClick} />
        //       ))} */}
        //     </tbody>
        //   </table>
        //   {noErrorSignature && (
        //     <p className="text-left my-5 ml-3 text-gray-500 ">
        //       No related logs found.
        //     </p>
        //   )}

        // </div>
        <div className="border-t mx-4 pb-4 border-gray-200 overflow-x-auto">
          {!noErrorSignature ? (
            <div className="mt-4 w-[90%]">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <ClipLoader color="#000000" size={20} />
                </div>
              )}
              {isError && (
                <p className="text-left my-5 ml-3">
                  Error fetching related logs: {error?.message}
                </p>
              )}
              {relatedLogs?.data.length === 0 && !isLoading && (
                <p className="text-left my-5 ml-3 text-gray-500">
                  No related logs found.
                </p>
              )}

              {relatedLogs?.data.length > 0 && (
                <RelatedLogsTable relatedLogs={relatedLogs} />
              )}
            </div>
          ) : (
            <p className="text-left my-5 ml-3 text-gray-500">
              No related logs found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RelatedLogs;
