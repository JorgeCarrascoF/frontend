import { api } from "../api";

export async function changePassword({ currentPassword, newPassword }) {
  try {
    const response = await api.put("/users/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(
        err.response.data.msg || "Error al cambiar la contraseña"
      );
    }
    throw new Error(err.message);
  }
}
