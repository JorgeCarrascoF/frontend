import { api } from "../api";

const deleteLog = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.patch(
    `/logs/${id}`,
    {
      deleted: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default deleteLog;
