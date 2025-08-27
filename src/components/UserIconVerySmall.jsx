import { getColorForName } from "../utils/getColorForName";
import { getInitials } from "../utils/getInitials";

const UserIconVerySmall = ({ name = "Default User" }) => {
  const initials = getInitials(name);
  const bgColor = getColorForName(name);
  return (
    <div
      className={`rounded-full h-full flex items-center justify-center w-[30px] aspect-square`}
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-white font-bold select-none text-xs">
        {initials}
      </span>
    </div>
  );
};

export default UserIconVerySmall;
