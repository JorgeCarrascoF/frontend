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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setSuccess("Login successful!");
      login(data.token, data.user.id, data.user);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      setError("Login error: " + error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");
    setSuccess("");

    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
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
      className="flex flex-col items-center p-4 mt-2 w-full"
    >
      <h1 className="mb-4 text-4xl font-bold">Login in Buggle</h1>
      <div className="flex flex-col items-center justify-center w-[80%] p-10 rounded-md gap-10 ">
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email" className={`font-bold text-left`}>
            Email
          </label>
          <input
            className={`border-2 ${
              emailError ? "border-red-500" : "border-gray-200"
            }  py-2 px-3 rounded-md w-full`}
            id="email"
            type="text"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500 text-sm text-left ml-4">{emailError}</p>}
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password" className={`font-bold text-left`}>
            Password
          </label>
          <input
            className={`border-2 ${
              passwordError ? "border-red-500" : "border-gray-200"
            }  py-2 px-3 rounded-md w-full`}
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="text-red-500 text-sm text-left ml-4">{passwordError}</p>}
        </div>
        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : success ? (
          success && <p style={{ color: "green" }}>{success}</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              className="cursor-pointer bg-[#f0f2f5] w-[50%]"
              type="submit"
            >
              Login
            </button>
            <span>Forgot your password?</span>
          </div>
        )}
        {error &&
          (console.log("Error:", error),
          (<p style={{ color: "red" }}>{error}</p>))}
      </div>
    </form>
  );
};

export default LoginForm;
