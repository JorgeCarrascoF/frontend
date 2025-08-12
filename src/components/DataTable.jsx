import { formatDate } from "../utils/formatDate";

export default function DataTable({ columns, data }) {
  return (
    <div className="w-full border border-gray-200 rounded-md overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={`px-4 py-2 border-b-[1px] border-gray-200 ${
                  i === 0 ? "rounded-tl-md" : ""
                }
                  ${i === columns.length - 1 ? "rounded-tr-md" : ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col, i) => (
                <td
                  key={col.key}
                  className={`px-4 py-2 truncate w-fit border-gray-200 ${
                    idx === data.length - 1 && i === 0 ? "rounded-bl-md" : ""
                  }
                  ${
                    idx === data.length - 1 && i === columns.length - 1
                      ? "rounded-br-md"
                      : ""
                  }
                  ${idx === data.length - 1 ? "" : "border-b-[1px]"}`}
                >
                  {row[col.key] ? (
                    col.key == "created_at" ? (
                      <span>{formatDate(row[col.key])}</span>
                    ) : (
                      <span>{row[col.key]}</span>
                    )
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
