import UserDashboard from "../components/UserDashboard";

const Users = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAuthorized = userData?.role === "admin";

  if (!isAuthorized) {
    return (
      <div className="card">
        <h1>Sin autorización</h1>
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="mb-4">Usuarios</h1>
      <UserDashboard />
    </div>
  );
};

export default Users;
