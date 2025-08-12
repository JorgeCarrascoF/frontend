import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../queries/getUsers";
import { ClipLoader } from "react-spinners";
import DataTable from "./DataTable";
import { useState } from "react";

const USERS_PER_PAGE = 10;

const UserDashboard = () => {
  const [page, setPage] = useState(1);

  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorLoadingUsers,
    error,
    isPreviousData
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ page, limit: USERS_PER_PAGE }),
    keepPreviousData: true,
  });

  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

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
        {console.log(error)}
        <span className="text-red-600">
          Error: {JSON.parse(error.request.response).msg}
        </span>
      </div>
    );
  }

  console.log(users);

  return (
    <div>
      <div className="flex flex-col w-[800px] mt-8 h-[500px]">
        <DataTable columns={columns} data={users.data} />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 rounded-md px-4 py-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Página anterior
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            if (!isPreviousData && users.data.length === USERS_PER_PAGE) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPreviousData || users.data.length < USERS_PER_PAGE}
          className="bg-blue-500 rounded-md px-4 py-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Página siguiente
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
