import UserIcon from "../components/UserIcon";
import Button from "../components/Button";
import { useState } from "react";
import PersonalInformation from "../components/PersonalInformation";
import ChangePasswordForm from "../components/ChangePasswordForm";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [changingPassword, setChangingPassword] = useState(false);

  return (
    <div className=" w-full h-full">
      <div className="flex items-center justify-between mb-4 mt-4">
        <h1 className="text-2xl font-bold">
          Edit profile
        </h1>
      </div>
      <div className="flex items-center justify-between m-2.5 rounded-2xl h-[90%]">
        <div className="border border-gray-200 bg-white rounded-2xl h-full w-[27%] flex flex-col items-center justify-start gap-20 py-20">
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
          <div className="flex flex-col w-[75%] gap-5 items-center">
            <Button
              active={!changingPassword}
              variant="section"
              align="left"
              onClick={() => setChangingPassword(false)}
            >
              Personal information
            </Button>
            <Button
              active={changingPassword}
              variant="section"
              align="left"
              onClick={() => setChangingPassword(true)}
            >
              Change password
            </Button>
          </div>
        </div>
        <div className="border border-gray-200 bg-white rounded-2xl h-full w-[72%]">
          {changingPassword ? (
            <div className="ms-15 mt-20"><ChangePasswordForm setChangingPassword={setChangingPassword} /></div>
          ) : (
            <PersonalInformation data={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
