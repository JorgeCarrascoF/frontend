import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createLog } from "../queries/createLog";
import { Link, useNavigate } from "react-router-dom";

export default function CreateLogForm() {
  const [log, setLog] = useState({});
  const [labelCount, setLabelCount] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newLog) => createLog(newLog),
    onSuccess: (data) => {
      // console.log("Log created successfully:", data);
      setMessage("Log created successfully");
      setTimeout(() => {
        navigate(`/dashboard/log/${data.log._id}`);
      }, 1000);
    },
    onError: () => {
      setMessage("Error creating log");
    },
  });

  const isButtonDisabled = useMemo(() => {
    const campos = [
      log.project,
      log.status,
      log.platform,
      log.type,
      log.priority,
      log.filename,
      log.function,
      log.firstSeen,
      log.lastSeen,
    ];
    return !campos.some((valor) => Boolean(valor));
  }, [log]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log data:", log);
    mutation.mutate(log);
    // setLog({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-full h-full flex flex-col justify-center"
    >
      {/* Encabezado */}
      {/* Primera fila */}
      <label className="block mb-2 text-sm font-medium text-left">Name</label>
      <div className="grid grid-cols-8 gap-4 mb-10">
        <input
          placeholder=""
          className="border col-span-4 rounded-md px-3 py-2 text-sm"
          onChange={(e) => setLog({ ...log, message: e.target.value })}
        />
        <select
          className="border rounded-md ms-15 px-3 py-2 text-sm text-gray-500 h-12 w-55"
          onChange={(e) => setLog({ ...log, status: e.target.value })}
        >
          <option value="">Set status</option>
          <option value="unresolved">Unresolved</option>
          <option value="in review">In Review</option>
          <option value="solved">Solved</option>
        </select>
      </div>

      {/* Segunda fila */}
      <label className="block mb-2 text-sm font-medium text-left">
        Description
      </label>
      <div className="grid grid-cols-8 gap-4 mb-10">
        <div className="relative col-span-4">
          <textarea
            placeholder=""
            className="border rounded-md px-3 py-2 text-sm w-full h-24 resize-none"
            maxLength={5000}
            onChange={(e) => {
              setLog({ ...log, description: e.target.value });
              setLabelCount(e.target.value.length);
            }}
          />
          <span className="absolute top-25 right-3 text-xs text-gray-400">
            {labelCount}/5000
          </span>
        </div>
        <select
          className="border rounded-md ms-15 px-3 py-2 text-sm text-gray-500 w-55 h-12"
          onChange={(e) => setLog({ ...log, type: e.target.value })}
        >
          <option value="">Error type</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Tercera fila */}
      <label className="block mb-2 text-sm font-medium text-left">
        Assignee
      </label>
      <div className="grid grid-cols-8 gap-4 mt-4 mb-15">
        <select
          className="border rounded-md col-span-2 px-3 py-2 text-sm text-gray-500"
          onChange={(e) => setLog({ ...log, assigned_to: e.target.value })}
        >
          <option value="">Assign to</option>
          <option value="user1">User 1</option>
        </select>
        <select
          className="border rounded-md ms-8 col-span-2 px-3 py-2 text-sm text-gray-500"
          onChange={(e) => setLog({ ...log, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="border rounded-md w-55 h-12 ms-15 px-3 py-2 text-sm text-gray-500"
          onChange={(e) => setLog({ ...log, environment: e.target.value })}
        >
          <option value="">Set Environment</option>
          <option value="production">Production</option>
          <option value="development">Development</option>
          <option value="testing">Testing</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Link
          to="/dashboard"
          className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`px-5 py-2 rounded-md text-white transition ${
            isButtonDisabled
              ? "bg-gray-300 cursor-not-allowed text-black"
              : "bg-blue-800 hover:bg-blue-900"
          }`}
        >
          Save
        </button>
      </div>

      {message && <p className="text-sm text-gray-600 mt-4">{message}</p>}
    </form>
  );
}
