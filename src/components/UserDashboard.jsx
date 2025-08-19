import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../queries/getUsers";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import Button from "./Button";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";
import UserTable from "./UserTable.jsx";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 13;

const UserDashboard = () => {
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userData"));

  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorLoadingUsers,
    error,
    isPreviousData,
  } = useQuery({
    queryKey: ["users", page, roleFilter],
    queryFn: () => getUsers({ page, limit: USERS_PER_PAGE, role: roleFilter }),
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

  if (errorLoadingUsers) {
    return (
      <div className="flex flex-col items-center justify-center shadow-md p-4 rounded-md bg-red-100 text-red-800">
        <span className="text-red-600">
          Error: {JSON.parse(error.request.response).msg}
        </span>
      </div>
    );
  }

  console.log(users);
  let totalPages = users ? Math.ceil(users.total / USERS_PER_PAGE) : 0;

  const handleRowClick = (row) => {
    navigate(`/users/${row.id}`);
  };

  return (
    <div className="flex flex-col h-full w-full self-start mt-2">
      <div className="mr-auto">
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className={`${
            roleFilter ? "bg-[#295ba2] text-white" : "bg-[#f0f2f5]"
          } rounded-lg px-2 py-2 ms-4`}
        >
          <option value="">Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </div>
      {loadingUsers ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : users.data.length === 0 ? (
        <div>No more users available.</div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col w-full mt-4">
            <UserTable
              columns={columns}
              data={users.data}
              onDelete={(user) => {
                console.log("Delete user:", user);
              }}
              onRowClick={handleRowClick}
            />
          </div>
          <div className="flex justify-center items-center mt-auto gap-4">
            <div className="w-[175px]">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                <Icon path={mdiChevronLeft} size={1} />
                Previous page
              </Button>
            </div>
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
            <div className="w-[175px]">
              <Button
                onClick={() => setPage((old) => old + 1)}
                disabled={isPreviousData || users.data.length < USERS_PER_PAGE}
              >
                Next page
                <Icon path={mdiChevronRight} size={1} />
              </Button>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
