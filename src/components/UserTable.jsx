import { mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";

const UserTable = ({ data, onDelete, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm max-w-7xl mx-auto mb-4">
      <table className="w-full table-fixed border-collapse text-sm">
        {/* Header */}
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
            <th className="w-[80px] px-4 py-2 text-center font-medium text-gray-600 border-b border-b-gray-200">
              Delete
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 cursor-pointer border-t border-b-gray-200"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {/* Username */}
              <td className="w-[180px] px-4 py-2 text-left text-gray-800 truncate whitespace-nowrap overflow-hidden">
                {row.username}
              </td>

              {/* Email */}
              <td className="w-[250px] px-4 py-2 text-left text-gray-800 truncate whitespace-nowrap overflow-hidden">
                {row.email}
              </td>

              {/* Role */}
              <td className="w-[100px] px-4 py-2 text-left text-gray-800 capitalize">
                {row.role}
              </td>

              {/* Date */}
              <td className="w-[120px] px-4 py-2 text-left text-gray-800">
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              {/* Status */}
              <td className="w-[120px] px-4 py-2 text-center">
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

              {/* Delete */}
              <td className="w-[80px] px-4 py-2 text-center">
                <button
                  onClick={() => onDelete?.(row)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Icon path={mdiDelete} size={0.9} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
