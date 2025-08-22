const variants = {
  primary: {
    base: "text-white bg-[#295ba2] hover:bg-[#244e8a] disabled:bg-[#C7D8F0] disabled:text-[#3974BE]",
  },
  secondary: {
    base: "text-black bg-white hover:bg-[#DBDBDB] disabled:bg-[#DBDBDB] text-[#74797F]",
  },
  pagination: {
    base: "text-black bg-[#F0F2F5]",
    active: "text-white bg-[#295BA2]",
  },
  section: {
    base: "text-black",
    active: "bg-[#E3EBF6]",
  },

  // base: {
  //   base: "text-white disabled:text-[#3974BE]",
  //   disabled: "bg-[#C7D8F0]",
  //   bg: "bg-[#7e9cc7]",
  //   bgActive: "bg-[#295ba2]",
  //   hover: "hover:bg-[#3f77c6]",
  //   icon: "text-black",
  //   border: "",
  // },
  // dark: {
  //   base: "text-white",
  //   bg: "bg-black",
  //   bgActive: "bg-black",
  //   hover: "hover:bg-gray-800",
  //   icon: "text-white",
  //   border: "",
  // },
  // light: {
  //   base: "text-black",
  //   bg: "bg-white",
  //   disabled: "bg-",
  //   bgActive: "bg-[#c7d8f0]",
  //   hover: "hover:bg-[#e3ebf6]",
  //   icon: "text-black",
  //   border: "",
  // },
  // mixed: {
  //   base: "text-black disabled:text-black",
  //   disabled: "bg-[#f0f2f5]",
  //   bg: "bg-[#f0f2f5]",
  //   bgActive: "bg-[#295ba2] text-white",
  //   hover: "hover:bg-[#295ba2]",
  //   icon: "text-white",
  //   border: "",
  // },
  // gray: {
  //   base: "text-black",
  //   bg: "bg-gray-300",
  //   bgActive: "bg-[#fafafa]",
  //   hover: "hover:bg-gray-300",
  //   icon: "text-black",
  //   border: "border border-[#DBDBDB]",
  // },
  // outline: {
  //   base: "text-[#295BA2]",
  //   bg: "bg-white",
  //   bgActive: "bg-transparent",
  //   hover: "",
  //   icon: "text-[#295BA2]",
  //   border: "border-2 border-[#295BA2]",
  // },
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
  variant = "primary",
  type = "button",
  align = "center",
}) => {
  const v = variants[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`cursor-pointer rounded-md flex ${justifyMap[align]} 
w-full items-center gap-2 py-2 px-5 
${active && v.active ? v.active : v.base} 
disabled:cursor-not-allowed transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
