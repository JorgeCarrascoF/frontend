import PaginatedPostDashboard from "../components/PaginatedPostDashboard";
import NavButton from "../components/NavButton";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { use } from "react";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + 
    "eyJpZCI6IjEyMyIsIm5hbWUiOiJBbmRyw6lzIiwiYWRtaW4iOnRydWV9." + 
    "b4GSWSOLg6tU9v5zsMvWZzWUCUi5dWGMoiEjMb1odbc";

  // if (Token) {
  //   const decoded = jwtDecode(Token);
  //   const userId = decoded.id;

  //   axios.get(`/api/getUserByID/${userId}`, {
  //     headers: { Authorization: `Bearer ${Token}` }
  //   })
  //   .then(response => {
  //     const user = response.data;
  //     console.log(user.name); // Nombre del usuario
  //   })
  //   .catch(err => {
  //     console.error("Error al obtener usuario:", err);
  //   });
  // }

  if (!token) {
    return (
      <div className="card">
        <h1>Sin autorización</h1>
        <p>Por favor, inicie sesión para acceder a la aplicación.</p>
        <NavButton text="Ir a Login" route="/login" />
      </div>
    );
  }

  if (fakeToken) {
    const decoded = jwtDecode(fakeToken);
    const userName = decoded.name;
    return (
      <div>
        {/* <h3 style={{marginBottom: 0, marginLeft: "1350px"}}>{userName}</h3> */}
        <h1>Dashboard de {userName}</h1>
        <NavButton text="Ir a inicio" route="/" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          <PaginatedPostDashboard />
        </div>
      </div>
    );
  }
};

export default Dashboard;
