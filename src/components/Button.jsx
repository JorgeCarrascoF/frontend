const variants = {
  light: {
    base: "text-gray-900",
    bg: "bg-[#f0f2f5]",
    bgActive: "bg-gray-800",
    colorActive: "text-white",
    hover: "hover:bg-[#f0f2f5]",
    icon: "text-black",
  },
  dark: {
    base: "text-white",
    bg: "bg-black",
    bgActive: "bg-black",
    hover: "hover:bg-gray-800",
    icon: "text-white",
  },
};

const Button = ({
  onClick,
  disabled,
  active = false,
  children,
  variant = "light",
}) => {
  const v = variants[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-md flex items-center gap-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        v.bg
      } ${v.hover} ${v.base} ${active ? v.bgActive : ""} ${
        active ? v.colorActive : ""
      } transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
