import { formatDate } from "../utils/formatDate";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

export default function DataTable({ columns, data, onRowClick }) {
  const dateKeys = ["createdAt", "updatedAt", "created_at", "updated_at"];

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
            <tr
              key={idx}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, i) =>
                col.key === "delete" ? (
                  <td
                    key={col.key}
                    className={`truncate w-fit border-gray-200 ${
                      idx === data.length - 1 && i === 0 ? "rounded-bl-md" : ""
                    }
                  ${
                    idx === data.length - 1 && i === columns.length - 1
                      ? "rounded-br-md"
                      : ""
                  }
                  ${idx === data.length - 1 ? "" : "border-b-[1px]"}`}
                  >
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete user with ID:", row.id);
                      }}
                    >
                      <Icon path={mdiDelete} size={0.9} />
                    </button>
                  </td>
                ) : (
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
                      dateKeys.includes(col.key) ? (
                        <span>{formatDate(row[col.key])}</span>
                      ) : (
                        <span>{row[col.key]}</span>
                      )
                    ) : (
                      ""
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}