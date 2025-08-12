import { api } from "../api";

export const getUsers = async ({page, limit}) => {
  const token = localStorage.getItem("token");
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit
    }
  });
  return response.data;
};
