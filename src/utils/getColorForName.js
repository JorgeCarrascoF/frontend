import { hashString } from "./hashString";

const colores = [
  "#F44336", // rojo
  "#E91E63", // rosa
  "#9C27B0", // morado
  "#673AB7", // índigo
  "#3F51B5", // azul
  "#2196F3", // azul claro
  "#03A9F4", // celeste
  "#009688", // verde
  "#4CAF50", // verde claro
  "#FFC107"  // amarillo
];


export const getColorForName = (name) => {
  const hash = hashString(name);
  const index = Math.abs(hash) % colores.length;
  return colores[index];
}