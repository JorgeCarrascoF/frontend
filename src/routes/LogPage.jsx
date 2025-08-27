import { useParams } from "react-router-dom";
import LogInfo from "../components/LogInfo";
import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";

const LogPage = () => {
  const { id: logId } = useParams();


  return (
    <div className="w-[80%] mt-5 ml-15">
      <div className="flex flex-col items-center">
        <LogInfo logId={logId} />
      </div>
    </div>
  );
};

export default LogPage;
