import { api } from "../api";

export async function updateLog(id, updatedFields) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.patch(`/logs/${id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error actualizando log:", error);
    throw error;
  }
}
