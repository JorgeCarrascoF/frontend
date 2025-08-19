import { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

const RecoverPassword = ({ setForgotPassword }) => {
  const [email, setEmail] = useState("");

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-full flex flex-col items-center py-6">
      <h1 className=" text-4xl font-semibold">Recover your password</h1>
      <div className="flex flex-col justify-center w-[75%] p-10 rounded-md gap-10 ">
        <TextInput
          label="Reset your password using your email"
          id="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-[50%] self-center">
          <Button
            disabled={!email || !isEmailValid(email)}
            onClick={() => {
              console.log("Sending reset link to:", email);
            }}
          >
            Send reset link
          </Button>
        </div>
        <span
          onClick={() => setForgotPassword(false)}
          className="cursor-pointer underline"
        >
          Back to login
        </span>
      </div>
    </div>
  );
};

export default RecoverPassword;
