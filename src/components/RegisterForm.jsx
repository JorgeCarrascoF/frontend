import { useState } from "react";
import { registerUser } from "../queries/createUser";
import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import NavButton from "../components/NavButton";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline } from "@mdi/js";
import Button from "./Button";
import Modal from "./Modal";

const inputBaseStyle =
  "w-full border text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    username: "",
    domain: "",
    password: "",
    roleId: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setForm({
        firstName: "",
        lastName: "",
        displayName: "",
        username: "",
        domain: "",
        password: "",
        roleId: "",
        role: "",
      });
      setResponseError("");
      setErrors({});
      setSuccess(true);
    },
    onError: (error) => {
      console.error("Error:", error);
      const jsonError = JSON.parse(error.request.response);
      setResponseError(jsonError.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (/\d/.test(form.firstName))
      newErrors.firstName = "First name must not contain numbers";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (/\d/.test(form.lastName))
      newErrors.lastName = "Last name must not contain numbers";
    if (form.displayName.length < 5)
      newErrors.displayName = "Display name must be at least 5 characters long";
    if (!form.username) newErrors.username = "Email is required";
    if (!form.domain.includes("@")) newErrors.domain = "Invalid email domain";
    if (!form.roleId) newErrors.roleId = "Role is required";
    if (!form.password)
      newErrors.password = "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(form.password))
      newErrors.password =
        "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(form.password))
      newErrors.password = "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(form.password))
      newErrors.password =
        "Password must contain at least one special symbol (!@#$%^&*)";
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    mutation.mutate(form);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 w-full mt-3 h-full"
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-left">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Jane"
            value={form.firstName}
            onChange={handleChange}
            minLength={2}
            maxLength={50}
            className={`${inputBaseStyle} ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-left">
            Second name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            minLength={2}
            maxLength={50}
            className={`${inputBaseStyle} ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-left">
            Username
          </label>
          <input
            type="text"
            name="displayName"
            placeholder="JaneDoe"
            value={form.displayName}
            onChange={handleChange}
            className={`${inputBaseStyle} ${
              errors.displayName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.displayName && (
            <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-left">
            Role
          </label>
          <select
            name="roleId"
            value={form.roleId}
            onChange={(e) => {
              handleChange(e);
              const roleName =
                e.target.options[e.target.selectedIndex]?.value || "";
              setForm((prev) => ({ ...prev, role: roleName }));
            }}
            className={`${inputBaseStyle} ${
              errors.roleId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" selected disabled hidden>
              Select role
            </option>
            <option key="admin" value="688abe5c6ad4e846fbdb0189">
              Admin
            </option>
            <option key="user" value="688e3fa51825b4d54f064ccc">
              Dev
            </option>
          </select>
          {errors.roleId && (
            <p className="text-red-500 text-xs mt-1">{errors.roleId}</p>
          )}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-left">
            User
          </label>
          <input
            type="text"
            name="username"
            placeholder="Email username"
            value={form.username}
            onChange={handleChange}
            className={`${inputBaseStyle} ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
        <div className="flex w-full">
          <div className="mb-5 w-full">
            <label className="block mb-2 text-sm font-medium text-left">
              Domain
            </label>
            <input
              type="text"
              name="domain"
              placeholder="buggle.com"
              value={form.domain}
              onChange={handleChange}
              className={`${inputBaseStyle} ${
                errors.domain ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.domain && (
              <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
            )}
          </div>
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-left">
            Password
          </label>
          <div></div>
          <input
            type="password"
            name="password"
            placeholder="*****************************"
            value={form.password}
            onChange={handleChange}
            className={`${inputBaseStyle} ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        {responseError && (
          <div className="col-span-2">
            <p className="text-red-500 text-md mt-1">{responseError}</p>
          </div>
        )}
        <div className="col-span-2 flex justify-end items-center mt-4">
          {mutation.isPending ? (
            <ClipLoader color="#36d7b7" />
          ) : (
            <div className="flex gap-4">
              <Button variant="secondary">Cancel</Button>
              <Button type="submit">
                Register
              </Button>
            </div>
          )}
        </div>
      </form>
      <Modal isOpen={success} onClose={() => setSuccess(false)}>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Icon path={mdiCheckCircleOutline} size={5} color={"green"} />
          <span className="text-xl m-8 text-[#008000]">
            Registration completed successfully
          </span>
          <span className="mb-6">
            The user has been successfully created. An email has been sent to
            the newly created user with a link to verify their account before
            they can access the platform.
          </span>
          <NavButton text={"Go to Users"} variant="dark" route={"/users"} />
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
