const variants = {
  light: {
    base: "text-white",
    bg: "bg-[#7e9cc7]",
    text: "text-white",
    bgActive: "bg-[#3f77c6]",
    colorActive: "text-white",
    hover: "hover:bg-[#3f77c6]",
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
  active = true,
  children,
  variant = "light",
  type = "button",
}) => {
  const v = variants[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`cursor-pointer rounded-md flex justify-center text-center w-full items-center gap-2 py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed  ${disabled ? "" : v.hover} ${v.base} ${active ? v.bgActive : ""} ${
        active ? v.colorActive : v.bg
      } transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
