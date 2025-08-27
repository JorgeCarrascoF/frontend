import NavButton from "./NavButton";
import Icon from "@mdi/react";
import { mdiFileOutline  } from "@mdi/js";
import { mdiAccountMultipleOutline } from "@mdi/js";
import LogoutButton from "./LogoutButton";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoIsotipo from "../assets/Buggle_Isotipo.svg";
import LogoTipografia from "../assets/Buggle_tipografia_curvas.svg";
import UserIconVerySmall from "./UserIconVerySmall.jsx";
import { mdiAccountCogOutline } from '@mdi/js';


const Layout = () => {
  const { isLoggedIn } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <nav className="w-[20rem] h-screen fixed left-0 flex flex-col justify-between pt-0 pb-4">
        <div className="mx-7 flex flex-col items-center">
          <span
            className="font-semibold self-start text-left text-black text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex w-[116px] items-center">
              <img src={LogoIsotipo} alt="Isotipo" className="h-8" />
              <img
                src={LogoTipografia}
                alt="Tipografía"
                className="h-[100px] relative"
              />
            </div>
          </span>
          {userData && (
            <div className="flex items-center gap-3 self-start">
              <div>
                <UserIconVerySmall name={userData.fullName} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-black">
                  {userData.fullName} - {userData.role}
                </span>
                <span className="text-sm text-gray-500">{userData.email}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-4 w-full ml-12 gap-[10px]">
            <NavButton
              text={"Logs"}
              route={"/dashboard"}
              icon={<Icon path={mdiFileOutline } size={1} />}
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
                icon={<Icon path={mdiAccountCogOutline} size={1} />}
              />
            )}
          </div>
        </div>
        <div className="mx-8 mt-4 flex flex-col items-center">
          <div className="flex flex-col mt-10 w-full -ml-8 mb-2 gap-2">
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="ml-[20rem] flex-1 flex flex-col py-6 px-6 overflow-auto h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
