import NavButton from "./NavButton";
import Icon from '@mdi/react';
import { mdiBookOpenBlankVariantOutline } from '@mdi/js';
import { mdiFile } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";




const Layout = ({ children }) => {
    const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#fafafa]">
        <nav className="w-[20%] text-white p-4 py-8 flex flex-col justify-between">
            <div className="mx-8 flex flex-col items-center">
                <span className="font-semibold self-start text-left text-black text-2xl cursor-pointer" onClick={() => navigate("/")}>Buggle</span>
                <div className="flex flex-col mt-10 w-full ml-2 gap-3">
                    <NavButton text={"Logs"} route={"/dashboard"} icon={<Icon path={mdiFile} size={1} />} />
                    <NavButton text={"Documentation"} route={"/docs"} icon={<Icon path={mdiBookOpenBlankVariantOutline} size={1} />}/>
                    <NavButton text={"User Management"} route={"/users"} icon={<Icon path={mdiAccountMultipleOutline} size={1} />}/>
                </div>
            </div>
            <div className="mx-8 mt-4 flex flex-col items-center">
                <div className="flex flex-col mt-10 w-full ml-2 gap-2">
                    <LogoutButton />
                </div>
            </div>
        </nav>
      <main className="flex py-6 justify-center  w-[80%]">{children}</main>
    </div>
  );
};

export default Layout;