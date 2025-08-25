import StatusRow from "./StatusRow";

const columns = [
  { key: "edited-by", label: "Edited by", width: "w-[30%]" },
  { key: "status", label: "Log Status", width: "w-[15%]" },
  { key: "date", label: "Date", width: "w-[25%]" },
  { key: "hours", label: "Hours", width: "w-[10%]" },
];

const StatusRegisterTable = ({ statusRegister }) => {
  return (
    <div className="flex flex-col my-4 max-h-[333px] w-[90%] border border-gray-200 rounded-md overflow-auto">
      <div className="flex-1 w-full overflow-y-auto">
        <table className="min-w-max table-fixed w-full">
          <thead className="bg-[#fafafa]">
            <tr className="[&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium [&>th]:border-b [&>th]:border-gray-200">
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`${col.width ?? ""} ${
                    i === 0 ? "rounded-tl-md" : ""
                  } ${i === columns.length - 1 ? "rounded-tr-md" : ""} `}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statusRegister.map((row) => (
              <StatusRow key={row.id} register={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusRegisterTable;
