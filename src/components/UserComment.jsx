import UserIconSmall from "./UserIconSmall";
import {formatDate} from "../utils/formatDate";

const UserComment = ({ comment }) => {
  return (
    <div className="p-3 flex items-center">
      <div className="w-[3.125rem] aspect-square mr-4">
        <UserIconSmall name={comment.user?.fullName || "Default User"} />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-baseline text-gray-700 gap-2">
          <span className=" font-semibold">
            {comment.user?.fullName || "Default User"}
          </span>
          <span className="text-gray-500 ml-1 text-sm">
            {formatDate(comment.create_at) || "Unknown Date"}
          </span>
        </div>
        <p className="text-gray-700 text-left">{comment.text || "No comment text available"}</p>
      </div>
    </div>
  );
};

export default UserComment;
