import { useEffect, useState } from "react";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { changeEmail } from "../queries/changeEmail";
import TextInput from "./TextInput";
import Modal from "./Modal";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline } from "@mdi/js";
import getToken from "../utils/getToken";

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
      let credentials = getToken("credentials");
      credentials = JSON.parse(credentials);
      localStorage.setItem(
        "credentials",
        JSON.stringify({ ...credentials, email: newEmail })
      );
      let userData = localStorage.getItem("userData");
      userData = JSON.parse(userData);
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, email: newEmail })
      );
    },
    onError: (error) => {
      console.log("Error changing email:", error.message);
      setMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ newEmail });
  };

  return (
    <div className="p-10 flex flex-col w-full h-[90%] items-start justify-start pt-0">
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
            <Button variant="secondary" onClick={() => setChangingEmail(false)}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={!validNewEmail || confirmEmail !== newEmail}
            >
              Change email
            </Button>
          </div>
        </div>
      <div
        className={`mt-4 text-sm text-red-500 ${mutation.isError ? "block" : "hidden"}`}
      >
        {message}
      </div>
      </form>


      <Modal
        isOpen={mutation.isSuccess}
        onClose={() => setChangingEmail(false)}
      >
        <div className="p-4 flex flex-col items-center gap-8">
          <Icon path={mdiCheckCircleOutline} size={4} color={"green"} />
          <h3 className="text-lg font-semibold text-[#008000]">
            Email updated successfully
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            You can now log in using your new email address.
          </p>
          <div>
            <Button variant="secondary" onClick={() => setChangingEmail(false)}>
              Go back
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeEmailForm;
