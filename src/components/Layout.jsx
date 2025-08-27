import NavButton from "./NavButton";
import Icon from "@mdi/react";
import { mdiFile } from "@mdi/js";
import { mdiAccountMultipleOutline } from "@mdi/js";
import LogoutButton from "./LogoutButton";
import { Outlet, useNavigate } from "react-router-dom";
import { mdiAccount } from "@mdi/js";
import { useAuth } from "../hooks/useAuth";
import LogoIsotipo from "../assets/Buggle_Isotipo.svg";
import LogoTipografia from "../assets/Buggle_tipografia_curvas.svg";
import UserIconSmall from "./UserIconSmall.jsx";

const Layout = () => {
  const { isLoggedIn } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <nav className="w-[20rem] h-screen fixed left-0 flex flex-col justify-between p-4 py-8">
        <div className="mx-8 flex flex-col items-center">
          <span
            className="font-semibold self-start text-left text-black text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex">
              <img src={LogoIsotipo} alt="Isotipo" className="h-12" />
              <img
                src={LogoTipografia}
                alt="Tipografía"
                className="h-24 w-24 relative bottom-6"
              />
            </div>
          </span>
          {userData && (
            <div className="flex items-center gap-3 self-start">
              <div>
                <UserIconSmall name={userData.fullName} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-black">
                  {userData.fullName} - {userData.role}
                </span>
                <span className="text-sm text-gray-500">{userData.email}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-10 w-full ml-2 gap-3">
            <NavButton
              text={"Logs"}
              route={"/dashboard"}
              icon={<Icon path={mdiFile} size={1} />}
            />
            {(userData?.role === "admin" ||
              userData?.role === "superadmin") && (
              <NavButton
                text={"User Management"}
                route={"/users"}
                icon={<Icon path={mdiAccountMultipleOutline} size={1} />}
              />
            )}
            {isLoggedIn && (
              <NavButton
                text={"Profile"}
                route={"/profile"}
                icon={<Icon path={mdiAccount} size={1} />}
              />
            )}
          </div>
        </div>
        <div className="mx-8 mt-4 flex flex-col items-center">
          <div className="flex flex-col mt-10 w-full ml-2 gap-2">
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="ml-[20rem] flex-1 flex flex-col py-6 px-8 overflow-auto h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
