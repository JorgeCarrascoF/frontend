import { api } from "../api";

export const getComments = async (logId) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await api.get(`/comments/log/${logId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Body:", error.response.data);
    }
    throw error;
  }
};
