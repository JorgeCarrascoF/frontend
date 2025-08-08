import { useParams } from "react-router-dom";
import EditLogForm from "../components/EditLogForm";

const LogEditPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Editar log {id}</h1>
      {id && (
        <EditLogForm
          logId={id}
          onUpdated={(updatedLog) => console.log(updatedLog)}
        />
      )}
    </div>
  );
};

export default LogEditPage;
