import { useNavigate } from "react-router-dom";
import RelatedLogRow from "./RelatedLogRow";

const columns = [
  { key: "id", label: "ID", width: "w-[25%]" },
  { key: "status", label: "Status", width: "w-[15%]" },
  { key: "message", label: "Error message", width: "w-[48%]" },
  { key: "environment", label: "Environment", width: "w-[12%]" },
];

const RelatedLogsTable = ({ relatedLogs }) => {

    const navigate = useNavigate();
  const onRowClick = (logId) => {
    console.log("Row clicked:", logId);
    navigate(`/dashboard/log/${logId}`);
  };

  return (
    <div className="flex flex-col w-full max-h-[333px] border border-gray-200 rounded-md overflow-auto">
      <div className="flex-1 w-full overflow-y-auto">
        <table className="min-w-max table-fixed w-full">
          <thead className="bg-[#fafafa]">
            <tr className="[&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium [&>th]:text-sm [&>th]:border-b [&>th]:border-gray-200">
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`${col.width ?? ""} ${
                    i === 0 ? "rounded-tl-md" : ""
                  } ${i === columns.length - 1 ? "rounded-tr-md" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relatedLogs.data.map((row) => (
              <RelatedLogRow key={row.id} log={row} onClick={onRowClick} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RelatedLogsTable;
