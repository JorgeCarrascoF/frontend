import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import Button from "./Button";
import TextInput from "./TextInput";
import ChangeEmailForm from "./ChangeEmailForm";

const PersonalInformation = ({ data }) => {
  const fullName = data?.fullName || "Default Name";

  const [editingEmail, setEditingEmail] = useState(false);

  return (
    <div className="p-8 w-full flex flex-col items-center mt-20">
      {editingEmail ? (
        <ChangeEmailForm setChangingEmail={setEditingEmail} />
      ) : (
        <>
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-2xl ml-15 text-left w-full font-semibold mb-4">
              Account Information
            </h2>
            <div className="w-[95px] flex items-center gap-1 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Button
                variant="primary"
                onClick={() => {
                  setEditingEmail(true);
                }}
              >
                <div>
                  <Icon path={mdiPencil} size={1} />
                </div>
                Edit
              </Button>
            </div>
          </div>
          <div className="w-[90%] flex justify-between items-center p-4 mb-4">
            <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
              <label className="block text-xl font-medium mb-2">
                First name
              </label>
              <p className="text-lg border px-2 py-2 text-left w-full rounded-lg border-gray-300">
                {fullName.split(" ")[0] || "Default Name"}
              </p>
            </div>
            <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
              <label className="block text-xl font-medium mb-2">
                Last name
              </label>
              <p className="text-lg border px-2 py-2 text-left w-full rounded-lg border-gray-300">
                {fullName.split(" ").slice(1).join(" ") || "Default Name"}
              </p>
            </div>
          </div>
          <div className="w-[90%] flex justify-between items-end p-4 mb-4">
            <div className="mb-4 flex justify-start items-start flex-col w-[40%]">
              <div className="w-full text-left">
                <label className="block text-xl font-medium mt-0 mb-2">
                  Email
                </label>
                <p className="text-lg border px-2 py-2 text-left w-full rounded-lg border-gray-300">
                  {data?.email || "Default Email"}
                </p>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
