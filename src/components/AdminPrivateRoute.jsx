import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token) {
    const decoded = jwtDecode(token);
    console.log("Contenido del token:", decoded);
   }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (userRole !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error("Token inválido:", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminPrivateRoute;