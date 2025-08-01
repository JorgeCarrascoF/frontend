import PaginatedPostDashboard from "../components/PaginatedPostDashboard";
import NavButton from "../components/NavButton";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="card">
        <h1>Sin autorización</h1>
        <p>Por favor, inicie sesión para acceder a la aplicación.</p>
        <NavButton text="Ir a Login" route="/login" />
      </div>
    );
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "20px 0",
        }}
      >
        <NavButton text="Ir a inicio" route="/" />
        <LogoutButton />
      </div>
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
};

export default Dashboard;
