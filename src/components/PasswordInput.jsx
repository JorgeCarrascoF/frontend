import { useState } from "react";
import Icon from '@mdi/react';
import { mdiEye } from '@mdi/js';
import { mdiEyeOff } from '@mdi/js';



export default function PasswordInput({
  label,
  value,
  onChange,
  name,
  placeholder,
  error,
}) {
  let [buttonType, setButtonType] = useState("password");
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-md text-left font-medium mb-1">
          {label}
        </label>
      )}
      <div
        className={`w-full px-3 py-2 relative ml-2 border rounded-md focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input
          type={buttonType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border-0 focus:ring-0 p-0 focus:border-gray-300 focus:outline-none`}
        />
        <button
          onClick={() => {
            buttonType === "password"
              ? setButtonType("text")
              : setButtonType("password");
          }}
          type="button"
          className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2"
        >
          {buttonType === "password" ? (
            <Icon path={mdiEye} size={1} />
          ) : (
            <Icon path={mdiEyeOff} size={1} />
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
