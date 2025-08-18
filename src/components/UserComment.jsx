import UserIconSmall from "./UserIconSmall";

const UserComment = ({ comment }) => {
  return (
    <div className="p-3 flex items-center">
      <div className="w-[50px] aspect-square mr-4">
        <UserIconSmall name="User Name" />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-baseline text-gray-700 gap-2">
          <span className=" font-semibold">User Name</span>
          <span className="text-gray-500 ml-1 text-sm">
            2024-01-20 14:35:00 UTC
          </span>
        </div>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default UserComment;
