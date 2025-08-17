export default function TextInput({
  label,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  error,
}) {
  const id = `text-input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="">
      {label && (
        <label
          htmlFor={id}
          className="block text-xl text-left font-medium mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${id}` : undefined}
        className={`w-full px-3 py-2 border text-lg rounded-md focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p
          id={`error-${id}`}
          className="text-sm text-red-500 w-full text-left mt-1 ml-4"
        >
          {error}
        </p>
      )}
    </div>
  );
}
