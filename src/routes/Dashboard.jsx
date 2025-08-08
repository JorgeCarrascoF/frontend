import NavButton from "../components/NavButton";
import LogDashboard from "../components/LogDashboard";
import PaginatedLogDashboard from "../components/PaginatedLogDashboard";

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
      <h1 className="mb-4">Dashboard de logs</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px",
          borderRadius: "5px",
        }}
      >
        <PaginatedLogDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
