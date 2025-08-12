import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[90%]">
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white w-[50%] py-4 px-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
