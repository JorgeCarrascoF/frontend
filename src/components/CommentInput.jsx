import Button from "./Button";
import UserIconSmall from "./UserIconSmall";

const CommentInput = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="items-center text-left my-5 ml-3  flex px-3">
      <UserIconSmall user={userData} />
      <input
        type="text"
        placeholder="Enter comment"
        className=" ml-2 flex-1 px-4 py-3 rounded-xl bg-[#ededed]"
      />
      <div className="w-fit ml-2">
        <Button onClick={()=>{}} active >Send</Button>
      </div>
    </div>
  );
};

export default CommentInput;
