export default function TextInput({ label, value, onChange, name, type = "text", placeholder, error }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-md text-left font-medium mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 ml-2 border rounded-md focus:outline-none focus:ring ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-sm text-red-500 w-full text-left mt-1 ml-4">{error}</p>}
    </div>
  );
}
