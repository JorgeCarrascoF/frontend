import { api } from "../api";

export const getUsers = async ({page, limit, role}) => {
  const token = localStorage.getItem("token");
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
      role
    }
  });
  return response.data;
};
