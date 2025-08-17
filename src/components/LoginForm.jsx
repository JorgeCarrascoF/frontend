import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { api } from "../api";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

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
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      setError("Login error: " + error.response.data.message);
      setPassword("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");
    setSuccess("");
    let error = false;

    if (!email.includes("@")) {
      setEmailError("Invalid email");
      error = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      error = true;
    }

    // fetch a la DB
    if (!error) {
      mutation.mutate({ email, password });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center p-4 mt-2 w-full"
    >
      <h1 className="mb-4 text-4xl font-bold">Log in to Buggle</h1>
      <div className="flex flex-col items-center justify-center w-[80%] p-10 rounded-md gap-10 ">
        <div className="flex flex-col w-full gap-2">
          <TextInput
            label="Email"
            id="email"
            type="text"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <PasswordInput
            label="Password"
            id="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : success ? (
          success && <p className="text-green-500">{success}</p>
        ) : (
          <div className="flex flex-col items-center w-[35%] gap-4">
            <Button type="submit" disabled={!email || !password}>
              Log in
            </Button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
