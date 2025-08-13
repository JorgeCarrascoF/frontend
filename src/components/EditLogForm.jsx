import { useMemo, useState } from "react";
import { getLogById } from "../queries/getLogById";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateLog } from "../queries/updateLog";
import { Link } from "react-router-dom";

export default function EditLogForm({ logId }) {
  const [log, setLog] = useState({});
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: ({ id, updatedFields }) => updateLog(id, updatedFields),
    onSuccess: (data) => {
      setMessage("Log actualizado correctamente");
      console.log("Log actualizado:", data);
    },
    onError: (error) => {
      setMessage("Error al actualizar el log");
      console.error("Error:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ id: logId, updatedFields: log });
    setLog({});
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md mt-4 border-2 pb-4 border-blue-300 w-fit flex flex-col items-baseline gap-4"
    >
      {/* <label>Mensaje</label>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <label>Nivel</label>
      <input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      />
      <button type="submit">Actualizar Log</button> */}

      <div className="w-full bg-blue-300 p-3 px-6 mb-2 flex justify-between items-center">
        <h2 className="font-bold">Log #{data.id}</h2>
      </div>
      <div className="flex gap-3 px-6 w-full">
        <div className="flex flex-col gap-1 align-baseline">
          <label className="font-semibold text-left">Proyecto:</label>
          <input
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.project}
            onChange={(e) => setLog({ ...log, project: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1 align-baseline">
          <label className="font-semibold text-left">Status:</label>
          <select
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.status}
            onChange={(e) => setLog({ ...log, status: e.target.value })}
          >
            <option value="unresolved">Sin resolver</option>
            <option value="resolved">Resuelto</option>
          </select>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Detalles técnicos
        </h3>
      </div>
      <div className="flex gap-3 px-6 w-full">
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Plataforma:</label>
          <input
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.platform}
            onChange={(e) => setLog({ ...log, platform: e.target.value })}
          />
        </div>
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Tipo:</label>
          <select
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.type}
            onChange={(e) => setLog({ ...log, type: e.target.value })}
          >
            <option value="info">info</option>
            <option value="warning">warning</option>
            <option value="error">error</option>
          </select>
        </div>
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Prioridad:</label>
          <select
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.priority}
            onChange={(e) => setLog({ ...log, priority: e.target.value })}
          >
            <option value="high">alta</option>
            <option value="medium">media</option>
            <option value="low">baja</option>
          </select>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Archivo
        </h3>
      </div>
      <div className="flex gap-3 px-6 w-full">
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Archivo:</label>
          <input
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.filename}
            onChange={(e) => setLog({ ...log, filename: e.target.value })}
          />
        </div>
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Función:</label>
          <input
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={data.function}
            onChange={(e) => setLog({ ...log, function: e.target.value })}
          />
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Estadísticas
        </h3>
      </div>
      <div className="flex gap-3 px-6 w-full">
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">First seen:</label>
          <input
            type="date"
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={new Date(data.firstSeen).toISOString().split("T")[0]}
            onChange={(e) =>
              setLog({
                ...log,
                firstSeen: new Date(e.target.value).toISOString(),
              })
            }
          />
        </div>
        <div className="flex flex-col align-baseline">
          <label className="font-semibold text-left">Last seen:</label>
          <input
            type="date"
            className="text-left border-[1px] px-1 rounded-md"
            defaultValue={new Date(data.lastSeen).toISOString().split("T")[0]}
            onChange={(e) =>
              setLog({
                ...log,
                lastSeen: new Date(e.target.value).toISOString(),
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-center w-full flex-col items-center gap-4 mt-4">
        <div className="flex gap-4 items-center justify-evenly w-full">
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer disabled:text-black bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Actualizar log
          </button>
          <Link to={`/dashboard/log/${logId}`} className="border-2 p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors">Cancelar</Link>
        </div>
        {message && <span className="text-gray-700">{message}</span>}
      </div>
    </form>
  );
}
