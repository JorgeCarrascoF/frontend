import { api } from "../api";

export const getLogById = async (logId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/logs/${logId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
