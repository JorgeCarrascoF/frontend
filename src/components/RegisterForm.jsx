import { useState } from "react";
import { api } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getRoles } from "../queries/getRoles";
import NavButton from "../components/NavButton";

const registerUser = async (data) => {
  const response = await api.post(`/auth/register`, data);
  return response.data;
};

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

  const { data: roles, isLoading: loadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

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
      setErrors({});
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Este campo es requerido";
    if (!form.lastName) newErrors.lastName = "Este campo es requerido";
    if (form.displayName.length < 5)
      newErrors.displayName = "Este campo debe tener mínimo 5 caracteres";
    if (!form.username) newErrors.username = "Este campo es requerido";
    if (!form.domain.includes("@"))
      newErrors.domain = "Este dominio no es válido";
    if (!form.roleId) newErrors.roleId = "Este campo es requerido";
    if (form.password.length < 6)
      newErrors.password = "Este campo debe tener mínimo 6 caracteres";
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
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full mt-3">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-left">Nombre</label>
        <input
          type="text"
          name="firstName"
          placeholder="Agrega el Nombre"
          value={form.firstName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-left">Apellido</label>
        <input
          type="text"
          name="lastName"
          placeholder="Agrega el Apellido"
          value={form.lastName}
          onChange={handleChange}
          className={`${inputBaseStyle} ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-left">Nombre de Usuario</label>
        <input
          type="text"
          name="displayName"
          placeholder="Agrega el Nombre de Usuario"
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
        <label className="block mb-2 text-sm font-medium text-left">Rol</label>
        <select
          name="roleId"
          value={form.roleId}
          onChange={(e) => {
            handleChange(e);
            const roleName =
              e.target.options[e.target.selectedIndex]?.text || "";
            setForm((prev) => ({ ...prev, role: roleName }));
          }}
          className={`${inputBaseStyle} ${
            errors.roleId ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Seleccionar Rol</option>
          {roles?.roles?.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="text-red-500 text-xs mt-1">{errors.roleId}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-left">Usuario</label>
        <input
          type="text"
          name="username"
          placeholder="Agrega el Usuario"
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

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-left">Dominio</label>
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

      <div className="col-span-1">
        <label className="block mb-2 text-sm font-medium text-left">Contraseña</label>
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

      <div className="col-span-2 flex justify-end">
        <NavButton text="Cancelar" route="/users" variant="dark"/>
        {mutation.isPending ? (
          <ClipLoader color="#36d7b7" size={20} />
        ) : (
          <button
            type="submit"
            className="ms-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 cursor-pointer"
          >
            Registrar
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;