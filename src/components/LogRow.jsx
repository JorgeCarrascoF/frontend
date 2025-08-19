import { formatDate } from "../utils/formatDate";
import Chip from "./Chip";

const LogRow = ({ log, onRowClick }) => {
  return (
    <tr
      className="cursor-pointer h-[42px] border-t text-left border-gray-200 text-sm hover:bg-gray-50
                 [&>td]:px-4 [&>td]:py-1 [&>td]:border-t [&>td]:border-gray-200"
      onClick={() => onRowClick(log)}
    >
      <td>{log.id}</td>
      <td>{log.environment}</td>
      <td className={`truncate max-w-[200px]`}>
        {" "}
        <div className="truncate overflow-hidden">{log.message}</div>
      </td>
      <td>
        <Chip type="priority" value={log.priority || "low"} showPoint />
      </td>
      <td>
        <Chip type="status" value={log.status || "Unresolved"} />
      </td>
      <td>
        <Chip type="assignee" value={log.assigned_to || "Jane Doe"} />
      </td>
      <td>{formatDate(log.created_at)}</td>
    </tr>
  );
};

export default LogRow;
