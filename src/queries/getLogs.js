import { api } from "../api";

export const getLogs = async ({ type, status, platform, priority, search, page, limit }) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();

  if (type) params.append("type", type);
  if (status) params.append("status", status);
  if (platform) params.append("platform", platform);
  if (priority) params.append("priority", priority);
  if (search) params.append("search", search);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const response = await api.get(`/logs?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
