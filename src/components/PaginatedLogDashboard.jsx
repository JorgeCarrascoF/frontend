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
  const [environmentFilter, setEnvironmentFilter] = useState("");
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
    { key: "created_at", label: "Date" },
  ];

  return (
    <div className="flex flex-col w-full items-center self-start">
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>Error type</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>

          <input
            type="date"
            className="bg-[#f0f2f5] rounded px-2 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={environmentFilter}
            onChange={(e) => setEnvironmentFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>Environment</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>Status</option>
            <option value="success">Pending</option>
            <option value="error">In Review</option>
            <option value="warning">Resolved</option>
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
