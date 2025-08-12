import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-5">🚫 Acceso no autorizado</h1>
      <p className="text-gray-600 max-w-md mb-4">
        No tienes permisos para acceder a esta página.  
        Por favor, inicia sesión con una cuenta de administrador.
      </p>
      <NavButton text="Volver al inicio" route="/" icon={<Icon path={mdiHome} size={1} />} variant="dark" />
    </div>
  );
};

export default UnauthorizedPage;