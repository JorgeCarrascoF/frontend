import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { components } from "react-select";
import Select from "react-select";

const DropdownIndicator = (props) => {
  const hasValue = !!props.selectProps.value;
  const colorizeOnActive = props.selectProps.colorizeOnActive;
  const color =
    colorizeOnActive && (props.selectProps.menuIsOpen || hasValue)
      ? "white"
      : "black";

  return (
    <components.DropdownIndicator {...props}>
      <Icon path={mdiChevronDown} size={1} color={color} />
    </components.DropdownIndicator>
  );
};

const CustomOption = (props) => (
  <components.Option {...props}>
    {props.data.color && (
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: props.data.color }}
      ></div>
    )}
    {props.data.label}
  </components.Option>
);

const SingleValue = (props) => (
  <components.SingleValue {...props}>
    {props.data.color && (
      <div
        className="w-3 h-3 rounded-full mr-2"
        style={{ backgroundColor: props.data.color }}
      ></div>
    )}
    {props.data.label}
  </components.SingleValue>
);

const SelectInput = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  colorizeOnActive = true,
  isDisabled = false,
}) => {
  const selectedOption = options.find((o) => o.value === value) || null;
  return (
    <Select
      value={selectedOption}
      onChange={(selected) =>
        onChange({ target: { value: selected?.value || "" } })
      }
      options={options}
      isDisabled={isDisabled}
      placeholder={placeholder}
      components={{ Option: CustomOption, DropdownIndicator }}
      colorizeOnActive={colorizeOnActive}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "8px",
          borderColor: state.isFocused ? "#295ba2" : "#d1d5db",
          backgroundColor:
            selectedOption && colorizeOnActive ? "#295ba2" : "#ffffff",
          color: selectedOption && colorizeOnActive ? "white" : "black",
          cursor: "pointer",
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }),
        option: (provided, state) => ({
          backgroundColor: state.isFocused ? "#e3ebf6" : "#ffffff",
          padding: 8,
          paddingLeft: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          paddingRight: 5,
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: selectedOption && colorizeOnActive ? "#ffffff" : "#737373",
        }),
      }}
    />
  );
};

export default SelectInput;
