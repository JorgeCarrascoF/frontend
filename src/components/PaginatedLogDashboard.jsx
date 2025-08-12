import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { getLogs } from "../queries/getLogs";
import DataTable from "./DataTable";

const POSTS_PER_PAGE = 5;

const PaginatedLogDashboard = () => {
  const [page, setPage] = useState(1);
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

  const applyFilters = () => {
    setFilters({
      type: typeFilter,
      status: statusFilter,
      platform: platformFilter,
      priority: priorityFilter,
      search: search,
      page: page,
      limit: POSTS_PER_PAGE,
    });
  };

  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: ["logs", page, filters],
    queryFn: () => getLogs({ ...filters, page, limit: POSTS_PER_PAGE }),
    keepPreviousData: true,
  });

  const columns = [
    { key: "id", label: "ID" },
    { key: "environment", label: "Environment" },
    { key: "message", label: "Error title" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Date" }
  ];

  return (
    <div className="flex flex-col w-full items-center self-start">
      <div className="w-full">
        <div className="flex gap-4 items-center mb-4">
          <h3 className="text-md font-semibold mb-2 text-left">Filtros</h3>
          <button
            onClick={applyFilters}
            className="bg-blue-500 rounded-md px-4 py-2"
          >
            Filtrar
          </button>
          <button
            onClick={() => {
              setFilters({});
              setSearch("");
              setStatusFilter("");
              setPlatformFilter("");
              setPriorityFilter("");
              setTypeFilter("");
            }}
            className="bg-blue-500 rounded-md px-4 py-2"
          >
            Reiniciar filtros
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
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Todos los estados</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="resolved">Resolved</option>
          </select>

          <input
            type="text"
            placeholder="Javascript"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          />

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
      <div className="w-full mt-6">
        {isLoading ? (
          <ClipLoader color="#36d7b7" size={50} />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : data.data.length === 0 ? (
          <div>No hay más logs disponibles.</div>
        ) : (
          <DataTable columns={columns} data={data.data} />
        )}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page == 1}
            className="bg-blue-500 rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {" "}
            Página anterior{" "}
          </button>
          <span> {page} </span>
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={
              isPreviousData || (data && data.data.length < POSTS_PER_PAGE)
            }
            className="bg-blue-500 rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {" "}
            Página siguiente{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginatedLogDashboard;
