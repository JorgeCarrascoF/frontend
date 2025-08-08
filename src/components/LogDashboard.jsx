import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../queries/getLogs";
import { ClipLoader } from "react-spinners";
import Log from "./Log";
import { useState } from "react";

const LogDashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    platform: "",
    priority: "",
    search: "",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["logs", filters],
    queryFn: () => getLogs(filters),
  });

  const applyFilters = () => {
    setFilters({
      type: typeFilter,
      status: statusFilter,
      platform: platformFilter,
      priority: priorityFilter,
      search: search,
    });
  };

  return (
    <div className="overflow-y-auto">
      <div>
        <div className="flex gap-4 items-center mb-4">
          <h3 className="text-md font-semibold mb-2 text-left">Filtros</h3>
          <button
            onClick={applyFilters}
            className="bg-blue-500 rounded-md px-4 py-2"
          >
            Filtrar
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            className="border w-[15vw] border-gray-300 rounded-md px-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Todos los tipos</option>
            <option value="Error">Error</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Todos los estados</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Todas las plataformas</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="Android">Android</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Todas las prioridades</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <ClipLoader color="#36d7b7" size={50} />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-0 mt-5 text-left">
            {data.count} logs disponibles
          </h2>
          <table className="border-separate border-spacing-4">
            <thead>
              <tr>
                <th className="px-3 py-2 font-medium">Project</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Platform</th>
                <th className="px-3 py-2 font-medium">Filename</th>
                <th className="px-3 py-2 font-medium">Function</th>
                <th className="px-3 py-2 font-medium">Priority</th>
                <th className="px-3 py-2m font-medium">Count</th>
                <th className="px-3 py-2 font-medium">First Seen</th>
                <th className="px-3 py-2 font-medium">Last Seen</th>
                <th className="px-3 py-2 font-medium">Sentry</th>
              </tr>
            </thead>
            <tbody className="">
              {data && data.data.map((log) => (
                <Log key={log.id} log={log} />
              ))}
            </tbody>
          </table>{" "}
        </>
      )}
    </div>
  );
};

export default LogDashboard;
