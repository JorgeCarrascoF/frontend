import { getColorForName } from "../utils/getColorForName";
import { getInitials } from "../utils/getInitials";

const UserIcon = ({ name = "Default User" }) => {
  const initials = getInitials(name);
  const bgColor = getColorForName(name);
  return (
    <div
      className={`rounded-full h-full w-full border-[1px] flex items-center justify-center`}
      style={{ fontSize: "80%", backgroundColor: bgColor }}

    >
      <span
        className="text-white font-bold select-none text-6xl"
      >
        {initials}
      </span>
    </div>
  );
};

export default UserIcon;
