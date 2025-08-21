const variants = {
  base: {
    base: "text-white",
    bg: "bg-[#7e9cc7]",
    bgActive: "bg-[#295ba2]",
    hover: "hover:bg-[#3f77c6]",
    icon: "text-black",
    border: "",
  },
  dark: {
    base: "text-white",
    bg: "bg-black",
    bgActive: "bg-black",
    hover: "hover:bg-gray-800",
    icon: "text-white",
    border: "",
  },
  light: {
    base: "text-black",
    bg: "bg-white",
    bgActive: "bg-[#e3ebf6]",
    hover: "hover:bg-[#e3ebf6]",
    icon: "text-black",
    border: "",
  },
  gray: {
    base: "text-black",
    bg: "bg-gray-300",
    bgActive: "bg-[#fafafa]",
    hover: "hover:bg-gray-300",
    icon: "text-black",
    border: "border border-[#DBDBDB]",
  },
};

const justifyMap = {
  left: "justify-left",
  center: "justify-center",
  right: "justify-right",
};

const Button = ({
  onClick,
  disabled,
  active = true,
  children,
  variant = "base",
  type = "button",
  align = "center",
}) => {
  const v = variants[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`cursor-pointer rounded-md flex ${
        justifyMap[align]
      } w-full items-center gap-2 py-2 px-5 ${v.border} disabled:opacity-50 disabled:cursor-not-allowed  ${
        disabled ? "" : v.hover
      } ${v.base} ${active ? v.bgActive : ""} ${
        active ? v.colorActive : v.bg
      } transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
