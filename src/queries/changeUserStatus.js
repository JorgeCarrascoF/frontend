import { api } from "../api";

export async function changeUserStatus(userId, isActive) {
    const token = localStorage.getItem("token");
    try {
        const response = await api.patch(
            `/users/${userId}`,
            { isActive: isActive },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.message;
    } catch (error) {
        console.error("Error changing user status:", error);
        throw error;
    }
}
