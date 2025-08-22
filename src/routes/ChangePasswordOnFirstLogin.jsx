import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePasswordOnFirstLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center m-auto h-screen">
      <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white w-[35%] py-16 px-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Change your password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          For security reasons, you must change your password before continuing.
        </p>
        <ChangePasswordForm redirectAfterChange="/" />
      </div>
    </div>
  );
};

export default ChangePasswordOnFirstLogin;