import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../queries/getUsers";
import { ClipLoader } from "react-spinners";
import DataTable from "./DataTable";
import { useState } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";

const USERS_PER_PAGE = 14;

const UserDashboard = () => {
  const [page, setPage] = useState(1);

  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData", userData);

  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorLoadingUsers,
    error,
    isPreviousData,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ page, limit: USERS_PER_PAGE }),
    keepPreviousData: true,
  });

  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Date" },
    { key: "active", label: "Status" },
  ];

  if (userData.role == "superadmin")
    columns.push({ key: "delete", label: "Delete" });

  if (loadingUsers) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "20px",
        }}
      >
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (errorLoadingUsers) {
    return (
      <div className="flex flex-col items-center justify-center shadow-md p-4 rounded-md bg-red-100 text-red-800">
        <span className="text-red-600">
          Error: {JSON.parse(error.request.response).msg}
        </span>
      </div>
    );
  }

  let totalPages = Math.ceil(users.total / USERS_PER_PAGE);

  return (
    <div className="flex flex-col w-full self-start">
      {users && (
        <h1 className="text-2xl font-bold text-left">{users.total} Users</h1>
      )}
      <div className="flex flex-col w-full mt-4">
        <DataTable columns={columns} data={users.data} />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          <Icon path={mdiChevronLeft} size={1} />
          Previous page
        </Button>
        <div className="flex gap-2">
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
        </div>
        <Button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPreviousData || users.data.length < USERS_PER_PAGE}
        >
          Next page
          <Icon path={mdiChevronRight} size={1} />
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
