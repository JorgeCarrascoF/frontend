import React from "react";
import NavButton from "../components/NavButton";

function NotFound() {
  return (
    <div className="mb-4 text-center p-2">
      <h1>404 - Página no encontrada</h1>
      <p className="my-5">Lo sentimos, la página que estás buscando no existe.</p>
      <NavButton text="Volver al inicio" route="/" />
    </div>
  );
}

export default NotFound;