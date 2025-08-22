import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePasswordOnFirstLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen">
      <div className="flex flex-col items-center rounded-2xl border-[1px] border-gray-200 bg-white w-[35%] h-[90%] py-16 px-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Change your Password
        </h1>
        <p className="text-gray-600 text-md text-center pb-0">
          For security reasons, you must change your password before continuing.
        </p>
        <div className="ms-79 w-[150%]">
          <ChangePasswordForm redirectAfterChange="/"/>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordOnFirstLogin;