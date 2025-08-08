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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mt-8"
    >
      <div className="flex flex-col items-center justify-center shadow-md p-10 rounded-md gap-10 bg-white text-black w-[400px]">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="username" className="font-bold text-left">
            Nombre de usuario
          </label>
          <input
            className="border-2 border-gray-200 py-1 px-2 rounded-md w-full"
            id="username"
            type="text"
            placeholder="usuario123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="border-b-2 border-gray-200 w-full" />
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email" className="font-bold text-left">
            Email
          </label>
          <input
            className="border-2 border-gray-200 py-1 px-2 rounded-md w-full"
            id="email"
            type="text"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="border-b-2 border-gray-200 w-full" />
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password" className="font-bold text-left">
            Password
          </label>
          <input
            className="border-2 border-gray-200 py-1 px-2 rounded-md w-full"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="border-b-2 border-gray-200 w-full" />

        <div className="flex flex-col w-full gap-2">
          <label htmlFor="roleId" className="font-bold text-left">
            Rol
          </label>
          {loadingRoles ? (
            <p>Cargando roles...</p>
          ) : (
            <select
              className="border-2 border-gray-200 py-1 px-2 rounded-md w-full"
              id="roleId"
              value={roleId}
              onChange={(e) => {
                setRoleId(e.target.value);
                setRole(e.target.options[e.target.selectedIndex].text);
              }}
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : (
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">Registrarse</button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </form>
  );
};

export default RegisterForm;
