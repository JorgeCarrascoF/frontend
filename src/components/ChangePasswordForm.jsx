import { useEffect, useState } from "react";
import Button from "./Button";
import PasswordInput from "./PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../queries/changePassword";
import { ClipLoader } from "react-spinners";
import Modal from "./Modal";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = ({ setChangingPassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [validNewPassword, setValidNewPassword] = useState(false);

  useEffect(() => {
    const isValid =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[!@#$%^&*]/.test(newPassword);
    setValidNewPassword(isValid);
  }, [newPassword]);

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      setMessage(data.msg);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      let credentials = localStorage.getItem("credentials");
      credentials = JSON.parse(credentials);
      localStorage.setItem("credentials", JSON.stringify({ ...credentials, password: newPassword }));
    },
    onError: (error) => {
      console.log("Error changing password:", error);
      setMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    mutation.mutate({ currentPassword, newPassword });
  };

  return (
    <div className="p-10 mt-10 flex flex-col w-full h-[90%] items-start justify-start">
      <h2 className="text-2xl font-semibold mb-10">Change Password</h2>
      <form className="flex flex-col gap-5 w-[60%]" onSubmit={handleSubmit}>
        <PasswordInput
          label="Current Password"
          placeholder={"Enter current password"}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div className="w-full">
          <PasswordInput
            label="New Password"
            placeholder={"Enter new password"}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="w-full ml-4 -mt-2 flex flex-col">
            <span className="text-sm w-full text-left mt-0">
              Please add all necessary character to create safe password:
            </span>
            <ul className="flex flex-col list-disc ml-5">
              <li
                className={`text-sm w-full text-left ${
                  newPassword &&
                  (newPassword.length >= 8 ? "text-green-500" : "text-red-500")
                }`}
              >
                At least 8 characters
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

        <div className="w-full">
          <PasswordInput
            label="Confirm New Password"
            placeholder={"Confirm new password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="w-full ml-4 -mt-2 flex flex-col">
            <span
              className={`text-sm w-full text-left mt-0 ${
                confirmPassword &&
                (confirmPassword === newPassword
                  ? "text-green-500"
                  : "text-red-500")
              }`}
            >
              Please confirm your new password.
            </span>
          </div>
        </div>
        <div className="m-auto flex mt-4 gap-4">
          {setChangingPassword && (
            <div className="">
              <Button variant="secondary" onClick={() => setChangingPassword(false)}>
                Cancel
              </Button>
            </div>
          )}
          <Button
            type="submit"
            disabled={newPassword !== confirmPassword || !validNewPassword}
          >
            Change password
          </Button>
        </div>
      </form>
      {mutation.isLoading ? (
        <ClipLoader />
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
      <Modal
        isOpen={mutation.isSuccess}
        onClose={() =>
          setChangingPassword ? setChangingPassword(false) : navigate("/")
        }
      >
        <div className="p-4 flex flex-col items-center gap-8">
          <Icon path={mdiCheckCircleOutline} size={4} color={"green"} />
          <h3 className="text-lg font-semibold text-[#008000]">
            Password updated successfully
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            You can now log in with your new password.
          </p>
          <div>
            <Button
              variant="secondary"
              onClick={() =>
                setChangingPassword ? setChangingPassword(false) : navigate("/")
              }
            >
              Go back
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePasswordForm;
