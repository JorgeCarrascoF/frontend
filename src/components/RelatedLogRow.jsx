import Chip from "./Chip";

const RelatedLogRow = ({ log }) => {
  return (
    <tr className=" text-gray-700">
      <td>{log.id}</td>
      <td>
        <Chip type={"status"} value={log.status} />{" "}
      </td>
      <td>{log.message}</td>
      <td>
        <Chip type={"environment"} value={log.environment} />
      </td>
    </tr>
  );
};

export default RelatedLogRow;
