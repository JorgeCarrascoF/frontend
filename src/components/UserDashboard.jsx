import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../queries/getUsers";
import { ClipLoader } from "react-spinners";

const UserDashboard = () => {
  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorLoadingUsers,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

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

  return (
    <div>
      <>
        <span>{users.count} usuarios</span>
        <div className="flex flex-col border-2 rounded-xl w-[800px] mt-8 h-[500px] overflow-y-scroll">
          <ul className="py-4 w-full gap-4 flex flex-col">
            {users.data.map((user) => (
              <li
                className="bg-white text-black px-4 py-2 rounded shadow w-full"
                key={user.id}
              >
                {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default UserDashboard;
