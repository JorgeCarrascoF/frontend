import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { api } from "../api";

const loginUser = async (data) => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login exitoso:", data);
      setSuccess("Login exitoso!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
    },
    onError: (error) => {
      console.error("Login fallido:", error);
      setError("Ha habido un error en el login: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!login.includes("@")) {
      setError("El correo electronico no es valido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLogin("");
    setPassword("");

    // fetch a la DB
    mutation.mutate({ login, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <label htmlFor="login">Email</label>
        <input
          id="login"
          type="text"
          placeholder="user@gmail.com"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : (
          <button type="submit">Login</button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
