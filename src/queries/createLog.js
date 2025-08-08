import { api } from "../api";

export async function createLog(logData) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post("/logs", logData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creando log:", error);
    throw error;
  }
}