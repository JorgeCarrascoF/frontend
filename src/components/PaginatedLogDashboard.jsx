import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { getLogs } from "../queries/getLogs";
import Button from "./Button";
import DataTable from "./DataTable";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import LogTable from "./LogTable";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import getPageNumbers from "../utils/getPageNumbers";

const LOGS_PER_PAGE = 10;

const PaginatedLogDashboard = ({ search, setSearch }) => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userData"));

  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: [
      "logs",
      page,
      search,
      typeFilter,
      dateFilter,
      statusFilter,
      environmentFilter,
      priorityFilter,
    ],
    queryFn: () =>
      getLogs({
        type: typeFilter,
        status: statusFilter,
        environment: environmentFilter,
        priority: priorityFilter,
        date: dateFilter,
        search: search.trim(),
        searchId:
          !isNaN(search) && search.trim() !== "" ? Number(search) : null,
        page,
        limit: LOGS_PER_PAGE,
      }),
    keepPreviousData: true,
  });

  const handleRowClick = (row) => {
    navigate(`/dashboard/log/${row.id}`);
  };

  let totalPages = data ? Math.ceil(data.total / LOGS_PER_PAGE) : 0;

  return (
    <div className="flex flex-col h-full w-full self-start">
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <SelectInput
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              placeholder="Error type"
              options={[
                { value: "error", label: "Error" },
                { value: "warning", label: "Warning" },
                { value: "info", label: "Info" },
              ]}
            />
          </div>

          <div>
            <SelectInput
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              placeholder="Error priority"
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>

          <div>
            <SelectInput
              value={environmentFilter}
              onChange={(e) => setEnvironmentFilter(e.target.value)}
              placeholder="Environment"
              options={[
                { value: "production", label: "Production" },
                { value: "testing", label: "Testing" },
                { value: "development", label: "Development" },
              ]}
            />
          </div>

          <div>
            <SelectInput
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Status"
              options={[
                { value: "unresolved", label: "Unresolved" },
                { value: "in review", label: "In Review" },
                { value: "solved", label: "Solved" },
              ]}
            />
          </div>

          {/* <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`${
              typeFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
            } rounded-lg px-2 py-2`}
          >
            <option value="" selected>
              Error type
            </option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select> */}

          <DateInput
            value={dateFilter}
            onChange={setDateFilter}
            placeholder="Date"
          />

          {/* <input
            type="date"
            className={`${
              dateFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
            } rounded-lg px-2 py-2`}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          /> */}

          {/* <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={`${
              priorityFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
            } rounded-lg px-2 py-2`}
          >
            <option value="" selected>
              Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select> */}

          {/* <select
            value={environmentFilter}
            onChange={(e) => setEnvironmentFilter(e.target.value)}
            className={`${
              environmentFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
            } rounded-lg px-2 py-2`}
          >
            <option value="" selected>
              Environment
            </option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select> */}

          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${
              statusFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
            } rounded-lg px-2 py-2`}
          >
            <option value="" selected>
              Status
            </option>
            <option value="unresolved">Unresolved</option>
            <option value="in review">In Review</option>
            <option value="resolved">Resolved</option>
          </select> */}

          {(search ||
            typeFilter ||
            dateFilter ||
            statusFilter ||
            environmentFilter ||
            priorityFilter) && (
            <div>
              <Button
                onClick={() => {
                  setSearch("");
                  setTypeFilter("");
                  setDateFilter("");
                  setStatusFilter("");
                  setEnvironmentFilter("");
                  setPriorityFilter("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center mt-4">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data.data.length === 0 ? (
        <div className="mt-10">No more logs available.</div>
      ) : (
        <>
          <div className="mt-4">
            <LogTable data={data?.data ?? []} onRowClick={handleRowClick} />
          </div>
          <div className="flex justify-center items-center gap-4 mt-auto pt-4">
            <div className="w-[11rem] flex">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                variant="mixed"
                active={false}
              >
                <Icon path={mdiChevronLeft} size={1} />
                Previous page
              </Button>
            </div>
            <div className="flex gap-2">
              {getPageNumbers(page, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <Button
                    variant="mixed"
                    key={i}
                    onClick={() => setPage(p)}
                    active={p === page}
                  >
                    {p}
                  </Button>
                )
              )}
            </div>
            <div className="w-[11rem] flex">
              <Button
                variant="mixed"
                onClick={() => setPage((old) => old + 1)}
                active={false}
                disabled={
                  isPreviousData || (data?.data?.length ?? 0) < LOGS_PER_PAGE
                }
              >
                Next page
                <Icon path={mdiChevronRight} size={1} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedLogDashboard;
