import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { useEffect } from "react";

const SelectInput = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  colorizeOnActive = true,
}) => {

  useEffect(() => {
    if (!value) {
      const defaultOption = options.find((o) => o.default);
      if (defaultOption) {
        onChange({ target: { value: defaultOption.value } });
      }
    }
  }, [value, options, onChange]);

  return (
    <div className={`w-full relative flex`}>
      <select
        className={`appearance-none w-full rounded-lg px-3 py-2 pr-10 
          ${
            value && colorizeOnActive
              ? "bg-[#295ba2] text-white"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        value={value}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}{" "}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon
          path={mdiChevronDown}
          size={1}
          color={value ? "white" : "black"}
        />
      </span>
    </div>
  );
};

export default SelectInput;
