import { api } from "../api";

export const getUserById = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
