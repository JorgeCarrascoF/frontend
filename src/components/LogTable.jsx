import LogRow from "./LogRow";

export default function LogTable({ data, onRowClick }) {
  const columns = [
    { key: "id", label: "ID", width: "w-[18%]" },
    { key: "environment", label: "Environment", width: "w-[10%]" },
    { key: "message", label: "Error title", width: "w-[25%]"},
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "assignee", label: "Assignee" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="w-full h-max-full border border-gray-200 rounded-md overflow-x-auto overflow-y-auto">
      <table className="w-full">
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
          {data.map((row) => (
            <LogRow key={row.id} log={row} onRowClick={onRowClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
