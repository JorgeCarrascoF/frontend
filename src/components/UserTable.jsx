import { mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";

const UserTable = ({ data, onDelete, onRowClick, currentUser }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm max-w-7xl mx-auto mb-4">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[180px] px-4 py-2 text-left font-medium text-gray-600 border-b border-b-gray-200">
              Username
            </th>
            <th className="w-[250px] px-4 py-2 text-left font-medium text-gray-600 border-b border-b-gray-200">
              Email
            </th>
            <th className="w-[100px] px-4 py-2 text-left font-medium text-gray-600 border-b border-b-gray-200">
              Role
            </th>
            <th className="w-[120px] px-4 py-2 text-left font-medium text-gray-600 border-b border-b-gray-200">
              Date
            </th>
            <th className="w-[120px] px-4 py-2 text-center font-medium text-gray-600 border-b border-b-gray-200">
              Status
            </th>

            {currentUser === "superadmin" && (
              <th className="w-[80px] px-4 py-2 text-center font-medium text-gray-600 border-b border-b-gray-200">
                Delete
              </th>
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 cursor-pointer border-t border-b-gray-200"
            >
              <td
                className="w-[180px] px-4 py-2 text-left text-gray-800 truncate whitespace-nowrap overflow-hidden"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.username}
              </td>

              <td
                className="w-[250px] px-4 py-2 text-left text-gray-800 truncate whitespace-nowrap overflow-hidden"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.email}
              </td>

              <td
                className="w-[100px] px-4 py-2 text-left text-gray-800 capitalize"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.role}
              </td>

              <td
                className="w-[120px] px-4 py-2 text-left text-gray-800"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              <td
                className="w-[120px] px-4 py-2 text-center"
                onClick={() => onRowClick && onRowClick(row)}
              >
                <span
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    row.active
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {row.active ? "Active" : "Inactive"}
                </span>
              </td>

              {currentUser === "superadmin" && (
                <td className="w-[80px] px-4 py-2 text-center">
                  <button
                    onClick={() => onDelete?.(row)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Icon path={mdiDelete} size={0.9} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;