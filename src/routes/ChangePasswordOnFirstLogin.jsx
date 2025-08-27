import { useEffect, useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../queries/changePassword";
import Button from "../components/Button";
import { ClipLoader } from "react-spinners";
import { changeUserFirstLoginStatus } from "../queries/changeUserFirstLoginStatus";
import { useNavigate } from "react-router-dom";

const ChangePasswordOnFirstLogin = () => {
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[!@#$%^&*]/.test(newPassword);
    setValidNewPassword(isValid);
  }, [newPassword]);

  const passwordIsSafe = () => {
    return (
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[!@#$%^&*]/.test(newPassword)
    );
  };

  const clearFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      setMessage(data.msg);
      setNewPassword("");
      setConfirmPassword("");
      let credentials = JSON.parse(localStorage.getItem("credentials"));
      if (credentials) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({ ...credentials, password: newPassword })
        );
      }
      userMutation.mutate({
        userId: localStorage.getItem("userId"),
        isFirstLogin: false,
      });
    },
    onError: (error) => {
      console.log("Error changing password:", error);
      setMessage(error.message);
    },
  });

  const userMutation = useMutation({
    mutationFn: changeUserFirstLoginStatus,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.log("Error changing user first login status:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    mutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto">
      <div className="flex flex-col items-center rounded-2xl border-[1px] border-gray-200 bg-white w-[50%] h-[90%] py-16 px-10">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Change your Password
        </h1>
        <form
          className="flex flex-col gap-5 items-center mt-10 w-[95%]"
          onSubmit={handleSubmit}
        >
          <div className="w-[70%]">
            <PasswordInput
              label="Current Password"
              placeholder={"Enter your current password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="w-[70%] mt-4">
            <PasswordInput
              label="New Password"
              placeholder={"Enter new password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="w-full ml-4 -mt-2 flex flex-col">
              <span
                className={`text-sm w-full text-left mt-0 mb-3 ${
                  passwordIsSafe() ? "text-green-500" : "text-red-500"
                }`}
              >
                {newPassword &&
                  (passwordIsSafe()
                    ? "✓ Secure password."
                    : "Please add all necessary character to create safe password:")}
              </span>
              <ul className="flex flex-col list-disc ml-5 gap-1 text-[#737373]">
                <li
                  className={`text-sm w-full text-left ${
                    newPassword &&
                    (newPassword.length >= 8
                      ? "text-green-500"
                      : "text-red-500")
                  }`}
                >
                  Minimum 8 characters
                </li>
                <li
                  className={`text-sm w-full text-left ${
                    newPassword &&
                    (/[A-Z]/.test(newPassword)
                      ? "text-green-500"
                      : "text-red-500")
                  }`}
                >
                  At least 1 uppercase letter
                </li>
                <li
                  className={`text-sm w-full text-left ${
                    newPassword &&
                    (/[0-9]/.test(newPassword)
                      ? "text-green-500"
                      : "text-red-500")
                  }`}
                >
                  At least 1 number
                </li>
                <li
                  className={`text-sm w-full text-left ${
                    newPassword &&
                    (/[!@#$%^&*]/.test(newPassword)
                      ? "text-green-500"
                      : "text-red-500")
                  }`}
                >
                  At least 1 special character (!@#$%^&*)
                </li>
              </ul>
            </div>
          </div>

          <div className="w-[70%] mt-6">
            <PasswordInput
              label="Confirm New Password"
              placeholder={"Confirm new password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="w-full ml-4 -mt-2 flex flex-col"></div>
          </div>
          <div className="ml-auto flex mt-10 gap-7">
            <div className="w-[170px]">
              <Button variant="tertiary" onClick={() => clearFields()}>
                Cancel
              </Button>
            </div>

            <div className="w-[170px]">
              <Button
                type="submit"
                disabled={newPassword !== confirmPassword || !validNewPassword}
              >
                Saved
              </Button>
            </div>
          </div>
        </form>
        {mutation.isPending ? (
          <div className="mt-4">
            <ClipLoader />
          </div>
        ) : (
          message && (
            <div
              className={`mt-4 text-sm ${
                mutation.isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChangePasswordOnFirstLogin;
