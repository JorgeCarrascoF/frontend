import PaginatedPostDashboard from "../components/PaginatedPostDashboard";
import NavButton from "../components/NavButton";

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
};

export default Dashboard;
