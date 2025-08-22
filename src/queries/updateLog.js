import { api } from "../api";
import getToken from "../utils/getToken";

export async function updateLog(id, updatedFields) {
  const token = getToken();

  console.log("Updating log with ID:", id, "Fields:", updatedFields);
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
