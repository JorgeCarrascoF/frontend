import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import UserIcon from "./UserIcon";
import Button from "./Button";
import { getUserById } from "../queries/getUserById";

const UserInfo = ({ userId }) => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  if (isLoading) return <ClipLoader color="#000000" size={50} />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className=" w-[100%] h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          {userData?.username || "Profile"}
        </h1>
      </div>
      <div className="flex items-center justify-between m-2.5 rounded-2xl h-[90%]">
        <div className="border-[1px] border-gray-200 bg-white rounded-2xl h-full w-[27%] flex flex-col items-center justify-start gap-20 py-20">
          <div className="w-full flex items-center flex-col">
            <div className=" rounded-full w-[40%] aspect-square flex items-center justify-center">
              <UserIcon name={userData?.fullName} />
            </div>
            <div className="text-center mt-2 flex flex-col items-center gap-1">
              <p className="text-2xl font-medium">
                {userData?.fullName || "Default Username"}
              </p>
              <p className="text-md text-gray-500">{userData?.email}</p>
              <p className="text-md text-black">{userData?.role}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <Button>Personal information</Button>
            <Button>Change status</Button>
          </div>
        </div>
        <div className="border-[1px] border-gray-200 bg-white rounded-2xl h-full w-[72%]"></div>
      </div>
    </div>
  );
};

export default UserInfo;
