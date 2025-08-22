import { api } from "../api";
import getToken from "../utils/getToken";

export const getRelatedLogs = async ({ error_signature }) => {
  const token = getToken();

  const response = await api.get(`/logs`, {
    params: {
      error_signature,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch related logs");
  }
  return response.json();
};
