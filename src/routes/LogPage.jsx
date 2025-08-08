import { useParams } from "react-router-dom";
import LogInfo from "../components/LogInfo";

const LogPage = () => {
  const { id: logId } = useParams();
  return (
    <div className=" flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-semibold">Detalles del log</h1>
      <LogInfo logId={logId} />
    </div>
  );
};

export default LogPage;
