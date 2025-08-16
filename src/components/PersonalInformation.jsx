import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";

const PersonalInformation = ({ data }) => {
  const fullName = data?.fullName || "Default Name";
  const username = data?.username || "Username";

  const [editingEmail, setEditingEmail] = useState(false);

  return (
    <div className="p-8 w-full flex flex-col items-center mt-20">
      <h2 className="text-4xl ml-15 text-left w-full font-semibold mb-4">
        Personal Information
      </h2>
      <div className="w-[90%] flex justify-between items-center p-4 mb-4">
        <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
          <label className="block text-xl font-medium mb-2">First name</label>
          <p className="text-lg border-[1px] px-2 py-2 text-left w-full rounded-lg border-gray-300">
            {fullName.split(" ")[0] || "Default Name"}
          </p>
        </div>
        <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
          <label className="block text-xl font-medium mb-2">Last name</label>
          <p className="text-lg border-[1px] px-2 py-2 text-left w-full rounded-lg border-gray-300">
            {fullName.split(" ").slice(1).join(" ") || "Default Name"}
          </p>
        </div>
      </div>
      <div className="w-[90%] flex justify-between items-end p-4 mb-4">
        <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
          <label className="block text-xl font-medium mb-2">Username</label>
          <p className="text-lg border-[1px] px-2 py-2 text-left w-full rounded-lg border-gray-300">
            {username}
          </p>
        </div>
        <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
          <button onClick={()=>{setEditingEmail(true)}} className="border-2 py-[1px] px-2 self-baseline-last flex items-center gap-1 -mb-5 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Icon path={mdiPencil} size={0.8} />
            Edit
          </button>
          <label className="block text-xl font-medium mt-0 mb-2">Email</label>
          <p className="text-lg border-[1px] px-2 py-2 text-left w-full rounded-lg border-gray-300">
            {data?.email || "Default Email"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
