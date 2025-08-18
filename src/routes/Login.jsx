import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center m-auto ">
      <div className="flex flex-col items-center rounded-2xl border-[1px] border-gray-200 bg-white w-[35%] py-16">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
