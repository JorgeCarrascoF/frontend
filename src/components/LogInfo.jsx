import { useQuery } from "@tanstack/react-query";
import { getLogById } from "../queries/getLogById";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../utils/formatDate";
import DeleteLogButton from "./DeleteLogButton";
import { Link } from "react-router-dom";
import LogDescription from "./LogDescription";
import LogComments from "./LogComments";
import LogAISuggestion from "./LogAISuggestion";
import Chip from "./Chip";

const LogInfo = ({ logId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
  });

  console.log(data);

  if (isLoading) return <ClipLoader color="#000000" size={50} />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <>
      <div className="w-full flex flex-col gap-6 border-[1px] border-gray-200 bg-white  rounded-2xl  py-5 px-6">
        <h1 className="text-3xl font-bold text-left m-2 mb-6">Log #{logId}</h1>

        <div className="flex flex-col items-start">
          <div className="mb-4 ml-4">
            <h2 className="text-xl font-semibold mb-1 text-left">
              Error message
            </h2>
            <p className="text-left ml-2 text-gray-500">{data.message}</p>
          </div>
          <div className="w-[100%] p-0 grid grid-cols-3 gap-8">
            <InfoItem
              label="Creation date"
              value={formatDate(data.created_at)}
            />
            <InfoItem label="Last seen" value={formatDate(data.last_seen_at)} />
            <InfoItem label="Error Type" value={"placeholder"} />
            <InfoItem label="Priority" value={data.priority} badge />
            <InfoItem label="Environment" value={data.environment} />
            <InfoItem label="Location" value={"placeholder"} />
            <InfoItem label="Assigned to" value={data.assigned_to} badge />
            <InfoItem label="Status" value={data.status} badge />
          </div>
        </div>
      </div>
      <LogDescription description={data.description} />
      <LogComments logId={logId} />
      <LogAISuggestion logId={logId} />
    </>
  );
};

const InfoItem = ({ label, value, badge, colSpan }) => (
  <div
    className={`${colSpan ? "col-span-2" : ""} w-fit flex flex-col ${
      badge ? "items-center" : "items-start"
    } p-4`}
  >
    <span className="text-lg font-semibold mb-1">{label}</span>
    {badge ? (
      <Chip type={label.toLowerCase().replace(" ", "_")} value={value} />
    ) : (
      <p className="ml-2 break-all">{value}</p>
    )}
  </div>
);

export default LogInfo;
