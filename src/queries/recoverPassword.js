import { api } from "../api";

export const recoverPassword = async (email) => {
  try {
    const response = await api.post("/recover-password", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { statusCode: 500, message: "Unexpected error" };
    }
  }
};
