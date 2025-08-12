import LoginForm from "../components/LoginForm";
import NavButton from "../components/NavButton";

const Login = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
