import Chip from "./Chip";

const RelatedLogRow = ({ log, onClick }) => {
  return (
    <tr className="h-[72px] cursor-pointer border-t border-t-gray-200 hover:bg-gray-50" onClick={() => onClick(log.id)}>
      <td className=" text-left px-3">{log.id}</td>
      <td className="">
        <div className="w-[80%]">
          <Chip
            type={"status"}
            value={
              log.status == "unresolved"
                ? "Pending"
                : log.status == "resolved"
                ? "Solved"
                : log.status
            }
          />{" "}
        </div>
      </td>
      <td className="text-left w-full truncate">{log.message}</td>
      <td>
        <Chip type={"environment"} value={log.environment} />
      </td>
    </tr>
  );
};

export default RelatedLogRow;
