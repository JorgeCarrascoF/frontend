import { useQuery } from "@tanstack/react-query";
import { getLogById } from "../queries/getLogById";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../utils/formatDate";
import DeleteLogButton from "./DeleteLogButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LogInfo = ({ logId }) => {
  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
  });

  if (isLoading) return <ClipLoader color="#000000" size={50} />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Log Detail</h1>
        <p className="text-gray-500 text-sm">
          View detailed information about the selected log entry
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6">
          Log Information #{logId}
        </h2>

        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
          <InfoItem label="Event ID" value={data.eventId} />
          <InfoItem label="File" value={data.filename} />
          <InfoItem label="Sentry Eve" value={data.linkSentry} isLink />
          <InfoItem label="Error Type" value={data.type} />
          <InfoItem label="Function" value={data.function} />
          <InfoItem label="Creation Date" value={formatDate(data.created_at)} />
          <InfoItem label="User IP" value={data.userIp} />
          <InfoItem label="Environment" value={data.environment} badge />
          <InfoItem label="Error Message" value={data.message} colSpan />
          <InfoItem label="Location" value={`${data.filename} in ${data.function}`} colSpan />
        </div>

        <div className="mt-8 flex gap-4">
          <DeleteLogButton
            logId={logId}
            onDeleteSuccess={() => {
              setDeleteMessage("Log borrado. Volviendo al dashboard...");
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);
            }}
            onError={() => {
              setDeleteMessage("Error al borrar el log");
            }}
          />
          <Link
            to={`/dashboard/log/${logId}/edit`}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Edit
          </Link>
        </div>

        {deleteMessage && (
          <p className="mt-4 text-sm text-gray-600">{deleteMessage}</p>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isLink, badge, colSpan }) => (
  <div className={`${colSpan ? "col-span-2" : ""}`}>
    <p className="text-gray-500 text-sm">{label}</p>
    {isLink ? (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline break-all"
      >
        {value}
      </a>
    ) : badge ? (
      <span className="inline-block px-3 py-1 rounded-full text-white bg-red-500 text-xs font-semibold mt-1">
        {value}
      </span>
    ) : (
      <p className="font-medium break-all">{value}</p>
    )}
  </div>
);

export default LogInfo;