import UserDashboard from "../components/UserDashboard";
import UnauthorizedPage from "./Unauthorized";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import NavButton from "../components/NavButton";


const Users = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAuthorized = userData?.role === "admin";

  if (!isAuthorized) {
    return (
      <UnauthorizedPage />
    );
  }

  return (
    <div className=" w-[90%]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <NavButton
          text="Create user"
          route="/users/register"
          variant="dark"
          icon={<Icon path={mdiOpenInNew} size={1} />}
        />
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white h-[90%] py-5 px-6">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Users;
