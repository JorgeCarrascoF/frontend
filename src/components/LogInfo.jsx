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
import SelectInput from "./SelectInput";
import { maxLimitInteger } from "../utils/maxLimitInteger";
import RelatedLogs from "./RelatedLogs";
import { registerStatusChange } from "../queries/registerStatusChange";
import DeactivateLog from "./DeactivateLog";
import LogStatusRegister from "./LogStatusRegister";
import splitDate from "../utils/splitDate";

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
    queryFn: () => getUsers({ page: 1, limit: maxLimitInteger }),
  });

  const mutation = useMutation({
    mutationFn: ({ updates }) => updateLog(logId, updates),
    onSuccess: (response) => {
      console.log("Log updated successfully", response);
      queryClient.invalidateQueries(["log", logId]);
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ newStatus }) => registerStatusChange(logId, newStatus),
    onSuccess: (response) => {
      console.log("Status changed successfully", response);
      queryClient.invalidateQueries(["log", logId]);
      queryClient.invalidateQueries(["statusRegister", logId]);
    },
    onError: (error) => {
      console.error("Error changing status:", error);
    },
  });

  const userOptions =
    users?.data?.map((u) => ({
      value: u.id,
      label: u.username,
    })) || [];

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

  const isInactive = log.active === false;

  const handleAssignedChange = (selected) => {
    mutation.mutate({
      updates: { assigned_to: selected.value },
    });
  };

  const handlePriorityChange = (e) => {
    mutation.mutate({
      updates: { priority: e.target.value },
    });
  };

  const handleStatusChange = (e) => {
    mutation.mutate({
      updates: { status: e.target.value },
    });
    statusMutation.mutate({ newStatus: e.target.value });
  };

  return (
    <>
      <div
        className={`w-full flex flex-col gap-6 border border-gray-200 bg-white rounded-2xl py-5 px-6 mb-4 ${
          isInactive ? " text-[#737373]" : " text-black"
        }`}
      >
        <div className="flex justify-between items-center mt-5">
          <div>
            <h1 className="text-3xl font-bold text-left m-2 mb-1">
              Log #{logId}
            </h1>
          </div>
          {currentUser?.role === "superadmin" && (
            <DeactivateLog logId={logId} inactive={isInactive} />
          )}
        </div>

        <div className="flex flex-col items-start mb-8 ms-5 mt-5">
          <div className="mb-4 ml-4">
            <h2 className="text-xl font-semibold mb-1 text-left">
              Error message
            </h2>
            <p className="text-left ml-2 text-gray-500">{log.message}</p>
          </div>
          <div className="w-[100%] p-0 grid grid-cols-3 gap-8">
            <InfoItem
              label="Creation date"
              value={formatDate(log.created_at)}
            />
            <InfoItem label="Last seen" value={formatDate(log.last_seen_at)} />
            <InfoItem
              label="Error Type"
              value={log.error_type || "Undetermined"}
            />
            <InfoItem label="Environment" value={log.environment} />
            <InfoItem
              label="Location"
              colSpan={2}
              value={
                log.culprit === "error culprit" || !log.culprit
                  ? "Undetermined"
                  : log.culprit
              }
            />

            <div className="w-fit flex flex-col items-start ">
              {isAdmin ? (
                <div className="">
                  <Select
                    options={userOptions}
                    defaultValue={userOptions.find(
                      (u) => u.value === log.assigned_to
                    )}
                    onChange={handleAssignedChange}
                    isSearchable
                    className="w-48 cursor-pointer"
                    isDisabled={mutation.isLoading || isInactive}
                  />
                </div>
              ) : (
                <InfoItem label="Priority" value={log.priority} badge />
              )}
            </div>
            <div className="w-fit flex flex-col items-start ">
              {isAdmin ? (
                <div className="">
                  <SelectInput
                    options={[
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ]}
                    value={log.priority}
                    onChange={handlePriorityChange}
                    className="w-48"
                    colorizeOnActive={false}
                    isDisabled={mutation.isLoading || isInactive}
                  />
                </div>
              ) : (
                <InfoItem
                  label="Assigned to"
                  value={
                    userOptions.find((u) => u.value === log.assigned_to)
                      ?.label ||
                    log.assigned_to ||
                    "Unassigned"
                  }
                />
              )}
            </div>

            <div className="w-fit flex flex-col items-start">
              {isAdmin ? (
                <SelectInput
                  options={[
                    { value: "unresolved", label: "Pending" },
                    { value: "in review", label: "In Review" },
                    { value: "solved", label: "Resolved" },
                  ]}
                  value={log.status}
                  onChange={handleStatusChange}
                  className="w-48"
                  colorizeOnActive={false}
                  isDisabled={mutation.isLoading || isInactive}
                />
              ) : (
                <InfoItem label="Status" value={log.status} />
              )}
            </div>
          </div>
        </div>
      </div>

      <LogDescription description={log.description} inactive={isInactive} />
      <LogComments logId={logId} inactive={isInactive} />
      <RelatedLogs log={log} inactive={isInactive} />
      <LogStatusRegister logId={logId} inactive={isInactive} />
      <LogAISuggestion logId={logId} inactive={isInactive} />
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
      <div className="w-28">
        <Chip
          type={label.toLowerCase().replace(" ", "_")}
          value={value}
          showPoint={label == "Priority"}
        />
      </div>
    ) : (
      <p className="ml-2 break-all">{value}</p>
    )}
  </div>
);

export default LogInfo;
