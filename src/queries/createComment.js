import { api } from "../api";

export async function createComment(logId, comment) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.post(
      "/comments",
      {
        logId,
        text: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creando un comentario:", error);
    throw error;
  }
}
