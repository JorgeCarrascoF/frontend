import { useParams } from "react-router-dom";
import LogInfo from "../components/LogInfo";
import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";

const LogPage = () => {
  const { id: logId } = useParams();


  return (
    <div className="w-[90%]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Log detail</h1>
        <div className="flex">
          <NavButton
            text="See all logs"
            route="/dashboard"
            variant="dark"
            icon={<Icon path={mdiOpenInNew} size={1} />}
          />
        </div>
      </div>
      <div className="flex flex-col items-center m-2.5">
        <LogInfo logId={logId} />
      </div>
    </div>
  );
};

export default LogPage;
