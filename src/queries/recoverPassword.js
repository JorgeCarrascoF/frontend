import { api } from "../api";

export const recoverPassword = async (email) => {
  try {
    const response = await api.post("/recover-password", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
