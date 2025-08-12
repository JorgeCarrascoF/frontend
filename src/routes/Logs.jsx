import NavButton from "../components/NavButton";
import PaginatedLogDashboard from "../components/PaginatedLogDashboard";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";

const Logs = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="card">
        <h1>Sin autorización</h1>
        <p>Por favor, inicie sesión para acceder a la aplicación.</p>
        <NavButton text="Ir a Login" route="/login" />
      </div>
    );
  }
  return (
    <div className=" w-[90%]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Logs</h1>
        <NavButton
          text="New log"
          route="/dashboard/log/create"
          variant="dark"
          icon={<Icon path={mdiOpenInNew} size={1} />}
        />
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white h-[90%] py-5 px-6">
        <PaginatedLogDashboard />
      </div>
    </div>
  );
};

export default Logs;
