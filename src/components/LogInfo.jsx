import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogById } from "../queries/getLogById";
import { getUsers } from "../queries/getUsers";
import { updateLog } from "../queries/updateLog";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../utils/formatDate";
import LogDescription from "./LogDescription";
import LogComments from "./LogComments";
import LogAISuggestion from "./LogAISuggestion";
import Chip from "./Chip";
import Select from "react-select";

const LogInfo = ({ logId }) => {
  const queryClient = useQueryClient();

  let currentUser = JSON.parse(localStorage.getItem("userData"));

  const {
    data: log,
    isLoading: isLoadingLog,
    isError: isErrorLog,
    error: logError,
  } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, limit: 100 }),
  });

  const mutation = useMutation({
    mutationFn: ({ updates }) => updateLog({ logId, updates }),
    onSuccess: () => {
      queryClient.invalidateQueries(["log", logId]);
    },
  });

  const userOptions =
    users?.data?.map((u) => ({
      value: u.id,
      label: u.username,
    })) || [];

  const statusOptions = ["Unresolved", "In Progress", "Resolved"];

  if (isLoadingLog || isLoadingUsers)
    return <ClipLoader color="#000000" size={50} />;

  if (isErrorLog)
    return <div className="text-red-500">Error: {logError.message}</div>;

  if (isErrorUsers)
    return (
      <div className="text-red-500">
        Error cargando usuarios: {usersError.message}
      </div>
    );

  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "superadmin";

  const handleAssignedChange = (selected) => {
    mutation.mutate({
      updates: { assigned_to: selected.value },
    });
  };

  const handleStatusChange = (e) => {
    mutation.mutate({
      updates: { status: e.target.value },
    });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-6 border-[1px] border-gray-200 bg-white  rounded-2xl  py-5 px-6">
        <h1 className="text-3xl font-bold text-left m-2 mb-6">Log #{logId}</h1>

        <div className="flex flex-col items-start">
          <div className="mb-4 ml-4">
            <h2 className="text-xl font-semibold mb-1 text-left">
              Error message
            </h2>
            <p className="text-left ml-2 text-gray-500">{log.message}</p>
          </div>
          <div className="w-[100%] p-0 grid grid-cols-3 gap-8">
            <InfoItem label="Creation date" value={formatDate(log.created_at)} />
            <InfoItem label="Last seen" value={formatDate(log.last_seen_at)} />
            <InfoItem label="Error Type" value={"placeholder"} />
            <InfoItem label="Priority" value={log.priority} badge />
            <InfoItem label="Environment" value={log.environment} />
            <InfoItem label="Location" value={"placeholder"} />

            <div className="w-fit flex flex-col items-start p-4">
              <span className="text-lg font-semibold mb-1">Assigned to</span>
              {isAdmin ? (
                <Select
                  options={userOptions}
                  defaultValue={userOptions.find(
                    (u) => u.value === log.assigned_to
                  )}
                  onChange={handleAssignedChange}
                  isSearchable
                  className="w-48"
                  isDisabled={mutation.isLoading}
                />
              ) : (
                <Chip
                  type="assigned_to"
                  value={
                    userOptions.find((u) => u.value === log.assigned_to)
                      ?.label || log.assigned_to
                  }
                />
              )}
            </div>

            <div className="w-fit flex flex-col items-start p-4">
              <span className="text-lg font-semibold mb-1">Status</span>
              <select
                value={log.status}
                onChange={handleStatusChange}
                className="border rounded-lg px-2 py-1 text-gray-700"
                disabled={mutation.isLoading}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <LogDescription description={log.description} />
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