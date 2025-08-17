import { useEffect, useState } from "react";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { changeEmail } from "../queries/changeEmail";
import TextInput from "./TextInput";

const ChangeEmailForm = ({ setChangingEmail }) => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");

  const [validNewEmail, setValidNewEmail] = useState(false);

  useEffect(() => {
    const isValid =
      newEmail.length >= 5 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setValidNewEmail(isValid);
  }, [newEmail]);

  const mutation = useMutation({
    mutationFn: changeEmail,
    onSuccess: (data) => {
      setMessage(data.msg);
      setNewEmail("");
      setConfirmEmail("");
    },
    onError: (error) => {
      console.log("Error changing email:", error);
      setMessage(error.response);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ newEmail });
  };

  return (
    <div className="p-10 flex flex-col w-full h-[90%] items-start justify-center">
      <h2 className="text-2xl font-semibold mb-10">Change Email</h2>
      <form className="flex flex-col gap-5 w-[60%]" onSubmit={handleSubmit}>
        <div className="w-full">
          <TextInput
            label="New Email"
            placeholder={"Enter new email"}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <div className="w-full ml-4 mt-1 flex flex-col">
            <span className="text-sm w-full text-left mt-0">
              Please add all necessary character to change email:
            </span>
            <ul className="flex flex-col list-disc ml-5">
              <li
                className={`text-sm w-full text-left ${
                  newEmail &&
                  (newEmail.includes("@") ? "text-green-500" : "text-red-500")
                }`}
              >
                Must include @
              </li>
              <li
                className={`text-sm w-full text-left ${
                  newEmail &&
                  (/\.[^\s@]+$/.test(newEmail)
                    ? "text-green-500"
                    : "text-red-500")
                }`}
              >
                Must include a valid domain
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <TextInput
            label="Confirm New Email"
            placeholder={"Confirm new email"}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <div className="w-full ml-4 mt-1 flex flex-col">
            <span
              className={`text-sm w-full text-left mt-0 ${
                confirmEmail &&
                (confirmEmail === newEmail ? "text-green-500" : "text-red-500")
              }`}
            >
              Please confirm your new email.
            </span>
          </div>
        </div>
        <div className="m-auto flex mt-4 gap-4">
          <div>
            <Button variant="light" onClick={() => setChangingEmail(false)}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              disabled={!validNewEmail || confirmEmail !== newEmail}
            >
              Change email
            </Button>
          </div>
        </div>
      </form>
      {message && (
        <div
          className={`mt-4 text-sm ${
            mutation.isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ChangeEmailForm;
