import NavButton from "../components/NavButton";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Registro</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
