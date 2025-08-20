import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import UserIcon from "./UserIcon";
import Button from "./Button";
import { getUserById } from "../queries/getUserById";
import NavButton from "./NavButton";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import { useState } from "react";

const UserInfo = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("info");

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
    <div className="w-full h-full">
      <div className="flex items-center justify-between mt-6 mb-8">
        <h1 className="text-2xl font-bold ms-6">Profile</h1>
        <div className="me-6">
          <NavButton
          text="User list"
          route="/users"
          variant="dark"
          icon={<Icon path={mdiOpenInNew} size={1} />}
        />
        </div>
      </div>

      <div className="flex gap-6 m-2.5 rounded-2xl h-[70%]">
        <div className="border border-gray-200 bg-white rounded-2xl h-full w-[27%] flex flex-col items-center py-12">
          <div className="flex flex-col items-center">
            <div className="rounded-full w-24 h-24 flex items-center justify-center">
              <UserIcon name={userData?.username || "Profile"} />
            </div>
            <div className="text-center mt-3 flex flex-col items-center gap-1">
              <p className="text-2xl font-medium">
                {userData?.username || "Profile"}
              </p>
              <p className="text-md text-gray-500">{userData?.email}</p>
              <p className="text-md text-black">{userData?.role}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-12 w-full px-3">
            <button
              onClick={() => setActiveTab("info")}
              className={`text-left px-3 py-2 rounded-md w-[90%] mx-auto ${
                activeTab === "info"
                  ? "bg-gray-100 text-black font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Account information
            </button>
            <button
              onClick={() => setActiveTab("status")}
              className={`text-left px-3 py-2 rounded-md w-[90%] mx-auto ${
                activeTab === "status"
                  ? "bg-gray-100 text-black font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Change status
            </button>
          </div>
        </div>

        <div className="border border-gray-200 bg-white rounded-2xl h-full w-[73%] p-8 flex flex-col justify-between">
          {activeTab === "info" && (
            <div className="mt-10 ms-8">
              <h2 className="flex justify-start text-xl font-semibold mb-8">
                Account Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-10 mt-5">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userData?.firstName || ""}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 h-[80%]"
                  />
                </div>
                <div className="mb-10 mt-5">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userData?.lastName || ""}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 h-[80%]"
                  />
                </div>
                <div className="mb-10">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={userData?.email || ""}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 h-[80%]"
                  />
                </div>
                <div className="mb-10">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={userData?.createdAt?.slice(0, 10) || ""}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 h-[80%]"
                  />
                </div>
                <div className="mb-10">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    value={userData?.status || "Active"}
                    disabled
                    className="w-full border border-green-400 rounded-md px-3 py-2 bg-green-50 text-green-600 h-[80%]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="mt-3 ms-2">
              <h2 className="flex justify-start text-xl font-semibold ms-6 mb-6 mt-7">
                Account Information
              </h2>
              <div className="grid grid-cols-1 gap-6 w-1/2 ms-6 mt-14">
                <div>
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    Current Status
                  </label>
                  <input
                    type="text"
                    value={userData?.status || "Active"}
                    disabled
                    className="w-full border border-green-400 rounded-md px-3 py-2 bg-green-50 text-green-600 h-[90%]"
                  />
                </div>
                <div className="mt-21">
                  <label className="flex justify-start block text-md text-gray-600 mb-2">
                    New Status
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 h-[90%]">
                    <option>Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {activeTab === "status" && (
        <div className="flex justify-end gap-4 mt-6 me-5">
          <button className="px-6 py-2 rounded-md bg-gray-400 hover:bg-gray-600 text-white w-[11%] cursor-pointer">
            Cancel
          </button>
          <button className="px-6 py-2 rounded-md ms-3 bg-[#295ba2] hover:bg-gray-800 text-white w-[11%] cursor-pointer">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;