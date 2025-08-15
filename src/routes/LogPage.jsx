import { useParams } from "react-router-dom";
import LogInfo from "../components/LogInfo";

const LogPage = () => {
  const { id: logId } = useParams();
  return (
    <div className=" w-[72%] h-[82%] mt-10">
      <div className="flex flex-col text-left ms-5 mb-10">
        <h1 className="mb-3 text-4xl">Detalles del log</h1>
        <h1 className="ms-1 text-m text-gray-500">Analiza el log seleccionado de forma detallada.</h1>
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white h-[90%] py-3 px-6">
        <LogInfo logId={logId} />
      </div>
    </div>
  );
};

export default LogPage;
