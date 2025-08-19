import { useRef } from "react";

const DateInput = ({ value, onChange, placeholder = "Date" }) => {
  const inputRef = useRef(null);

  return (
    <div
      tabIndex={0}
      className={`w-fit relative cursor-pointer rounded-lg px-3 py-2 
        ${value ? "bg-[#295ba2] text-white" : "bg-white text-gray-700 border border-gray-300"} 
        focus:outline-none focus:border-black`}
      onClick={() => inputRef.current?.showPicker()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.showPicker();
        }
      }}
    >
      <span className="flex-1">{value || placeholder}</span>

      <input
        ref={inputRef}
        type="date"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
