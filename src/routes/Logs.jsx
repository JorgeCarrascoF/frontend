import NavButton from "../components/NavButton";
import PaginatedLogDashboard from "../components/PaginatedLogDashboard";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";
import { useState } from "react";

const Logs = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-[90%]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Logs</h1>
        <div className="flex">
          <div className="mr-6 relative bg-[#f0f2f5] rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" pl-10 pr-2 outline-none w-full h-full"
            />
            <Icon
              path={mdiMagnify}
              size={1}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <NavButton
            text="New log"
            route="/dashboard/log/create"
            variant="dark"
            icon={<Icon path={mdiOpenInNew} size={1} />}
          />
        </div>
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white h-[90%] py-5 px-6">
        <PaginatedLogDashboard search={search} setSearch={setSearch} />
      </div>
    </div>
  );
};

export default Logs;
