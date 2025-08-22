import { getColorForName } from "../utils/getColorForName";
import { getInitials } from "../utils/getInitials";

const UserIconSmall = ({ name = "Default User" }) => {
  const initials = getInitials(name);
  const bgColor = getColorForName(name);
  return (
    <div
      className={`rounded-full h-full flex items-center justify-center w-[3.125rem] aspect-square`}
      style={{ backgroundColor: bgColor }}

    >
      <span
        className="text-white font-bold select-none text-xl"
      >
        {initials}
      </span>
    </div>
  );
};

export default UserIconSmall;
