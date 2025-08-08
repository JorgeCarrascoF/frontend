import { Link, useLocation } from "react-router-dom";

const NavButton = ({ text, route }) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <Link
      to={route}
      className={`px-4 py-2 rounded border-2 ${
        isActive ? "border-blue-500" : "border-transparent"
      } hover:border-black transition-colors duration-200`}
    >
      <span className="text-gray-900">{text}</span>
    </Link>
  );
};

export default NavButton;
