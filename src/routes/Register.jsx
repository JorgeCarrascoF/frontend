import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className=" w-[90%] h-[90%] mt-10">
      <div className="flex flex-col text-left ms-5 mb-7">
        <h1 className="mb-4 text-4xl">Create new user</h1>
      </div>
      <div className="flex flex-col items-center m-2.5 rounded-2xl border-[1px] border-gray-200 bg-white h-[90%] py-3 px-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
