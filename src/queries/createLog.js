import { api } from "../api";

export async function createLog(logData) {
  const token = localStorage.getItem("token");
  logData.issue_id = crypto.randomUUID();
  logData.culprit = "";
  logData.active = true;
  logData.count = 1;
  logData.created_at = new Date().toISOString();
  logData.updated_at = new Date().toISOString();
  logData.json_sentry = {};


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