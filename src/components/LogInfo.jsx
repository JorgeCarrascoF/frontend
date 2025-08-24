import { useState } from "react";
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
import Modal from "./Modal";


const LogInfo = ({ logId }) => {
  const queryClient = useQueryClient();
  let currentUser = JSON.parse(localStorage.getItem("userData"));

  const [isInactive, setIsInactive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

console.log("Log data:", log);

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

  const confirmDeactivate = () => {
    setIsInactive(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`w-full flex flex-col gap-6 border border-gray-200 rounded-2xl py-5 px-6 mb-4 ${
          isInactive ? "bg-gray-100 text-gray-400" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-between items-center mt-5">
          <div>
            <h1 className="text-3xl font-bold text-left m-2 mb-1">
              Log #{logId}
            </h1>
          </div>

          {currentUser?.role === "superadmin" && (
            <button
              onClick={() =>
                isInactive ? setIsInactive(false) : setIsModalOpen(true)
              }
              className={`px-4 py-2 rounded-md font-medium transition me-5 ${
                isInactive
                  ? "bg-[#295ba2] text-white hover:bg-[#3f77c6]"
                  : "bg-[#295ba2] text-white hover:bg-[#3f77c6]"
              }`}
            >
              {isInactive ? "Activate Log" : "Deactivate Log"}
            </button>
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
            <InfoItem label="Creation date" value={formatDate(log.created_at)} />
            <InfoItem label="Last seen" value={formatDate(log.last_seen_at)} />
            <InfoItem
              label="Error Type"
              value={log.error_type || "Undetermined"}
            />
            <InfoItem label="Priority" value={log.priority} badge />
            <InfoItem label="Environment" value={log.environment} />
            <InfoItem
              label="Location"
              value={
                log.culprit === "error culprit" || !log.culprit
                  ? "Undetermined"
                  : log.culprit
              }
            />

            <div className="w-fit flex flex-col items-start">
              {isAdmin ? (
                <div className="pt-4">
                  <Select
                    options={userOptions}
                    defaultValue={userOptions.find(
                      (u) => u.value === log.assigned_to
                    )}
                    onChange={handleAssignedChange}
                    isSearchable
                    className="w-48 mt-2"
                    isDisabled={mutation.isLoading || isInactive}
                  />
                </div>
              ) : (
                <InfoItem
                  label="Assigned to"
                  value={
                    userOptions.find((u) => u.value === log.assigned_to)?.label ||
                    log.assigned_to
                  }
                />
              )}
            </div>

            <div className="w-fit flex flex-col items-start p-4">
              <SelectInput
                options={[
                  { value: "unresolved", label: "Pending" },
                  { value: "in review", label: "In Review" },
                  { value: "solved", label: "Resolved" },
                ]}
                value={log.status}
                onChange={handleStatusChange}
                className="w-48"
                isDisabled={mutation.isLoading || isInactive}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col items-center text-center p-6">
          <h2 className="text-2xl font-semibold mb-3">Deactivate this log?</h2>
          <p className="text-lg text-gray-600 mb-5">
            This action will mark the log as inactive. <br />
            It can be reactivated later if needed
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 w-32"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeactivate}
              className="px-4 py-2 rounded-lg bg-[#295ba2] text-white hover:bg-[#3f77c6] w-28"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <LogDescription description={log.description} />
      <LogComments logId={logId} />
      <RelatedLogs log={log} />
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