import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLog } from "../queries/createLog";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getUsers } from "../queries/getUsers";
import { maxLimitInteger } from "../utils/maxLimitInteger";
import SelectInput from "./SelectInput";
import Select from "react-select";
import Modal from "./Modal";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline } from "@mdi/js";

export default function CreateLogForm() {
  const [log, setLog] = useState({});
  const [labelCount, setLabelCount] = useState(0);
  const [message, setMessage] = useState("");
  const [logCreated, setLogCreated] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, limit: maxLimitInteger }),
  });

  const userOptions =
    users?.data?.map((u) => ({
      value: u.id,
      label: u.username,
    })) || [];

  const mutation = useMutation({
    mutationFn: (newLog) => createLog(newLog),
    onSuccess: (data) => {
      setLogCreated(true);
      // setMessage("Log created successfully");
      // setTimeout(() => {
      //   navigate(`/dashboard/log/${data.log._id}`);
      // }, 1000);
    },
    onError: () => {
      setMessage("Error creating log");
    },
  });

  const clearFields = () => {
    setLog({});
    setLabelCount(0);
    setMessage("");
  };

  const isButtonDisabled = useMemo(() => {
    return !(
      log.message &&
      log.message.length >= 5 &&
      log.description &&
      log.description.length >= 100 &&
      (userData.role == "user" || log.assigned_to) &&
      log.priority &&
      log.environment
    );
  }, [log]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!log.status) log.status = "unresolved";
    if (!log.type) log.type = "error";
    console.log("Log data:", log);
    mutation.mutate(log);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-full h-full flex flex-col justify-center"
    >
      {/* Encabezado */}
      {/* Primera fila */}
      <label className="block mb-2 text-sm font-medium text-left">
        Message
      </label>
      <div className="flex justify-between items-baseline w-[80%] gap-4 mb-10">
        <div className="w-[70%] flex flex-col">
          <input
            placeholder=""
            className="border w-full border-gray-300 rounded-md px-3 py-2 text-sm"
            onChange={(e) => setLog({ ...log, message: e.target.value })}
            value={log.message || ""}
            maxLength={100}
            minLength={5}
          />

          <span
            className={`${
              !log.message || log.message.length < 5
                ? "text-red-500 "
                : "text-transparent select-none"
            }  text-sm text-left ml-2 mt-1`}
          >
            Message is required and must be at least 5 characters long.
          </span>
        </div>
        <div className="w-[25%]">
          <SelectInput
            colorizeOnActive={false}
            options={[
              { value: "unresolved", label: "Unresolved" },
              { value: "in review", label: "In Review" },
              { value: "solved", label: "Solved" },
            ]}
            placeholder="Set status"
            onChange={(e) => setLog({ ...log, status: e.target.value })}
            value={log.status || ""}
          />
        </div>
        {/* <select
          className="border rounded-md ms-15 px-3 py-2 text-sm text-gray-500 h-12 w-55"
          onChange={(e) => setLog({ ...log, status: e.target.value })}
          value={log.status || ""}
        >
          <option value="">Set status</option>
          <option value="unresolved">Unresolved</option>
          <option value="in review">In Review</option>
          <option value="solved">Solved</option>
        </select> */}
      </div>

      {/* Segunda fila */}
      <label className="block mb-2 text-sm font-medium text-left">
        Description
      </label>
      <div className="flex justify-between  w-[80%] gap-4 mb-10">
        <div className="relative flex flex-col w-[70%]">
          <textarea
            placeholder=""
            className="border rounded-md border-gray-300 px-3 py-2 text-sm w-full h-24 resize-none"
            maxLength={5000}
            minLength={100}
            onChange={(e) => {
              setLog({ ...log, description: e.target.value });
              setLabelCount(e.target.value.length);
            }}
            value={log.description || ""}
          />
          <span
            className={`${
              !log.description || log.description.length < 100
                ? "text-red-500 "
                : "text-transparent select-none"
            }  text-sm text-left ml-2 mt-1`}
          >
            Description is required and must be at least 100 characters long.
          </span>
          <span className="absolute top-25 right-3 text-xs text-gray-400">
            {labelCount}/5000
          </span>
        </div>
        {/* <select
          className="border rounded-md ms-15 px-3 py-2 text-sm text-gray-500 w-55 h-12"
          onChange={(e) => setLog({ ...log, type: e.target.value })}
          value={log.type || ""}
        >
          <option value="">Error type</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select> */}
        <div className="w-[25%]">
          <SelectInput
            colorizeOnActive={false}
            options={[
              { value: "info", label: "Info" },
              { value: "warning", label: "Warning" },
              { value: "error", label: "Error" },
            ]}
            placeholder="Set error type"
            onChange={(e) => setLog({ ...log, type: e.target.value })}
            value={log.type || ""}
          />
        </div>
      </div>

      {/* Tercera fila */}
      <label className="block mb-2 text-sm font-medium text-left">
        Assignee
      </label>
      <div className="flex justify-between w-[80%] gap-4 mb-10">
        <div className="flex items-center justify-between w-[70%]">
          <div className="w-[60%] flex flex-col br">
            <Select
              options={userOptions}
              value={
                userOptions.find((u) => u.value === log.assigned_to) || null
              }
              onChange={(e) =>
                setLog({ ...log, assigned_to: e ? e.value : null })
              }
              isSearchable
              placeholder="Select assignee"
              className={`w-full`}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: 8,
                }),
                singleValue: (base) => ({
                  ...base,
                }),
              }}
              isDisabled={mutation.isLoading || userData.role == "user"}
            />
            <span
              className={`${
                !log.assigned_to && userData.role != "user"
                  ? "text-red-500 "
                  : "text-transparent select-none"
              }  text-sm text-left ml-2 mt-1`}
            >
              Asignation is required
            </span>
          </div>
          <div className="w-[35%] flex flex-col">
            <SelectInput
              colorizeOnActive={false}
              options={[
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              placeholder="Set priority"
              onChange={(e) => setLog({ ...log, priority: e.target.value })}
              value={log.priority || ""}
            />
            <span
              className={`${
                !log.priority ? "text-red-500 " : "text-transparent select-none"
              }  text-sm text-left ml-2 mt-1`}
            >
              Priority is required
            </span>
          </div>
        </div>
        {/* <select
            className="border rounded-md w-full px-3 py-2 text-sm text-gray-500"
            onChange={(e) => setLog({ ...log, priority: e.target.value })}
            value={log.priority || ""}
            >
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            </select> */}

        <div className="h-full w-[25%] flex flex-col">
          <SelectInput
            colorizeOnActive={false}
            options={[
              { value: "production", label: "Production" },
              { value: "development", label: "Development" },
              { value: "testing", label: "Testing" },
            ]}
            placeholder="Set environment"
            onChange={(e) => setLog({ ...log, environment: e.target.value })}
            value={log.environment || ""}
          />
          <span
            className={`${
              !log.environment
                ? "text-red-500 "
                : "text-transparent select-none"
            }  text-sm text-left ml-2 mt-1`}
          >
            Environment is required
          </span>
          {/* <select
            className="border rounded-md ms-15 px-3 py-2 text-sm text-gray-500"
            value={log.environment || ""}
            onChange={(e) => setLog({ ...log, environment: e.target.value })}
          >
            <option value="">Set Environment</option>
            <option value="production">Production</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
          </select> */}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 w-full mt-4">
        <div>
          <Button
            type="button"
            variant="light"
            disabled={
              !(log.message ||
              log.description ||
              log.assigned_to ||
              log.priority ||
              log.environment || 
              log.status ||
              log.type)
            }
            onClick={clearFields}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button type="submit" disabled={isButtonDisabled}>
            Submit
          </Button>
        </div>
      </div>
      <Modal isOpen={logCreated}>
        <div className="flex flex-col items-center">
          <Icon
            path={mdiCheckCircleOutline}
            size={4}
            className="text-green-500 mb-4"
          />
          <h2 className="text-lg font-semibold mb-4">
            Log created successfully
          </h2>
          <span>You can now view it in the log list.</span>
          <div className="mt-10">
            <Button
              onClick={() => {
                setLogCreated(false);
                navigate(`/dashboard/`);
              }}
            >
              Go to list
            </Button>
          </div>
        </div>
      </Modal>
      {message && (
        <p
          className={`text-sm ${
            mutation.isSuccess ? "text-green-600" : "text-red-600"
          } mt-4`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
