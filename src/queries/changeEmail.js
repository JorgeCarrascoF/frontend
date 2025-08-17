import { api } from "../api";

export async function changeEmail({ newEmail }) {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  try {
    const response = await api.patch(
      `/users/${userId}`,
      { email: newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.msg || "Error changing email");
    }
    throw new Error(err.message);
  }
}
