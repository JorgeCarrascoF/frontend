import { Link, useLocation } from "react-router-dom";

  const variants = {
  light: {
    base: "text-gray-900",
    bg: "bg-[#fafafa]",
    bgActive: "bg-[#f0f2f5]",
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

const NavButton = ({ text, route, icon, variant = "light"}) => {
  const location = useLocation();
  const isActive = location.pathname === route;


  const v = variants[variant] || variants.light;

  return (
    <Link
      to={route}
      className={`px-4 py-3 flex items-center justify-left ${v.bg} ${v.base} rounded-lg ${isActive && v.bgActive}  ${v.hover} transition-colors duration-200`}
    >
      {icon && <span className={`mr-2 ${v.icon}`}>{icon}</span>}
      <span className={v.base}>{text}</span>
    </Link>
  );
};

export default NavButton;
