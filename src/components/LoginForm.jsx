import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { api } from "../api";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const loginUser = async (data) => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login exitoso:", data);
      setSuccess("Login exitoso!");
      login(data.token, data.user.id, data.user);

      setTimeout(() => {
        navigate("/");
      }, 1000);
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

    if (!email.includes("@")) {
      setError("El correo electronico no es valido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setEmail("");
    setPassword("");

    // fetch a la DB
    mutation.mutate({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mt-8"
    >
      <div className="flex flex-col items-center justify-center shadow-md p-10 rounded-md gap-10 bg-white text-black w-[400px]">
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
        <div className="border-b-2 border-gray-200 w-full"></div>
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
        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : success ? (
          success && <p style={{ color: "green" }}>{success}</p>
        ) : (
          <button className="cursor-pointer bg-[#f0f2f5] w-[50%]" type="submit">
            Login
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
