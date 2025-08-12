import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

function NotFound() {
  return (
    <div className="mb-4 text-center flex justify-center items-center flex-col">
      <h1 className="mb-8 text-5xl">404 - Página no encontrada</h1>

      <p className="my-5">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <NavButton
        text="Volver al inicio"
        route="/"
        icon={<Icon path={mdiHome} size={1} />}
        variant="dark"
      />
    </div>
  );
}

export default NotFound;
