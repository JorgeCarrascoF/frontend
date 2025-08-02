import { useState } from "react";
import { api } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getRoles } from "../queries/getRoles";

const registerUser = async (data) => {
  const response = await api.post(`/auth/register`, data);
  return response.data;
};

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");

  const { data: roles, isLoading: loadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(("Registro exitoso:", data));
      setSuccess("Registro exitoso!");
    },
    onError: (error) => {
      console.error("Registro fallido:", error);
      setError(
        "Ha habido un error en el registro: " + error.response.data.message
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || username.length < 5) {
      setError("El nombre de usuario debe tener al menos 5 caracteres.");
      return;
    }

    if (!email.includes("@")) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!roleId) {
      setError("Debe seleccionar un rol.");
      return;
    }
    setEmail("");
    setPassword("");

    // fetch a la DB
    mutation.mutate({ username, email, password, role, roleId });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <label htmlFor="username">Nombre de usuario</label>
        <input
          id="username"
          type="text"
          placeholder="usuario123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="user@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="roleId">Rol</label>
        {loadingRoles ? (
          <p>Cargando roles...</p>
        ) : (
          <select
            id="roleId"
            value={roleId}
            onChange={(e) => {
              setRoleId(e.target.value);
              setRole(e.target.options[e.target.selectedIndex].text);
            }}
            required
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        )}

        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : (
          <button type="submit">Registrarse</button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </form>
  );
};

export default RegisterForm;
