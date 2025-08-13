import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { getLogs } from "../queries/getLogs";
import Button from "./Button";
import DataTable from "./DataTable";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";

const LOGS_PER_PAGE = 5;

const PaginatedLogDashboard = ({search}) => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  let userData = JSON.parse(localStorage.getItem("userData"));


  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: ["logs", page, search, typeFilter, dateFilter, statusFilter, environmentFilter, priorityFilter],
    queryFn: () =>  getLogs({
      type: typeFilter,
      status: statusFilter,
      environment: environmentFilter, 
      priority: priorityFilter,
      search,
      page,
      limit: LOGS_PER_PAGE,
    }),
    keepPreviousData: true,
  });

  const columns = [
    { key: "id", label: "ID" },
    { key: "environment", label: "Environment" },
    { key: "message", label: "Error title" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
  ];

  if (userData.role == "admin" || userData.role == "superadmin") {
    columns.push({ key: "assigned_to", label: "Assignee" });
  }

  columns.push({ key: "created_at", label: "Date" });


  return (
    <div className="flex flex-col w-full items-center self-start">
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>
              Error type
            </option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>

          <input
            type="date"
            className="bg-[#f0f2f5] rounded px-2 py-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={environmentFilter}
            onChange={(e) => setEnvironmentFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>
              Environment
            </option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#f0f2f5] rounded px-2 py-2"
          >
            <option value="" selected disabled hidden>
              Status
            </option>
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
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            <Icon path={mdiChevronLeft} size={1} />
            Previous page
          </Button>
          {/* <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  active={pageNum === page}
                >
                  {pageNum}
                </Button>
              )
            )}
          </div> */}
          {page}
          <Button
            onClick={() => setPage((old) => old + 1)}
            disabled={
              isPreviousData || (data?.data?.length ?? 0) < LOGS_PER_PAGE
            }
          >
            <Icon path={mdiChevronRight} size={1} />
            Next page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginatedLogDashboard;
