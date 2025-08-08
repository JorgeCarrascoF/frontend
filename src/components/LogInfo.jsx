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
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className=" bg-white rounded-md mt-4 border-2 pb-4 border-amber-300 w-fit flex flex-col items-baseline gap-4">
      <div className="w-full bg-amber-300 p-3 px-6 mb-2 flex justify-between items-center">
        <h2 className="font-bold">Log #{logId}</h2>
        <a
          className="mx-2"
          href={data.linkSentry}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sentry
        </a>
      </div>
      <div className="flex justify-between px-6 w-full">
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Proyecto:</span>
          <span className="text-left">{data.project}</span>
        </div>
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Status:</span>
          <span className="text-left">{data.status}</span>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Detalles técnicos
        </h3>
      </div>
      <div className="flex justify-between px-6 w-full">
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Plataforma:</span>
          <span className="text-left">{data.platform}</span>
        </div>
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Tipo:</span>
          <span className="text-left">{data.type}</span>
        </div>
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Prioridad:</span>
          <span className="text-left">{data.priority}</span>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Archivo
        </h3>
      </div>
      <div className="flex justify-between px-6 w-full">
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Nombre de archivo:</span>
          <span className="text-left">{data.filename}</span>
        </div>
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Función:</span>
          <span className="text-left">{data.function}</span>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-semibold text-xl text-left mt-2 px-2 pb-1 flex border-b-[1px] border-gray-300">
          Estadísticas
        </h3>
      </div>
      <div className="flex justify-between px-6 w-full">
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">First seen:</span>
          <span className="text-left">{formatDate(data.firstSeen)}</span>
        </div>
        <div className="flex flex-col align-baseline">
          <span className="font-semibold text-left">Last seen:</span>
          <span className="text-left">{formatDate(data.lastSeen)}</span>
        </div>
      </div>
      <div className="flex justify-between px-6 w-full">
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
          className="bg-blue-400 border-2 hover:bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Editar
        </Link>
      </div>
      <div className="w-full">
        {deleteMessage && <span className="text-center">{deleteMessage}</span>}
      </div>
    </div>
  );
};

export default LogInfo;
