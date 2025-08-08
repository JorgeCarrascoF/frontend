import NavButton from "./NavButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/useAuth";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <header className="fixed top-0 z-50 bg-white shadow-md w-full py-3 px-6 flex justify-between">
      <span
        className="text-3xl font-bold dark:text-white"
        style={{
          color: "#121a2a"
        }}
      >
        {isLoggedIn ? `${userData.username} (${userData.role})` : "App"}
      </span>

      <div className="flex items-center gap-8">
        <NavButton text="Inicio" route="/" />
        <NavButton text="Logs" route="/dashboard" />
        <NavButton text="Crear Log" route="/dashboard/log/create" />
        <NavButton text="Usuarios" route="/users" />
      </div>
      {isLoggedIn ? (
        <div className="flex gap-4">
          <LogoutButton />
          <button className="bg-transparent border border-gray-300 rounded-md px-4 py-2">
            Perfil
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <NavButton text="Login" route="/login" />
          <NavButton text="Register" route="/register" />
        </div>
      )}
    </header>
  );
};

export default Header;
