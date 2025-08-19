import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import UserComment from "./UserComment";
import { mdiOpenInNew } from "@mdi/js";
import CommentInput from "./CommentInput";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../queries/getComments";
import { ClipLoader } from "react-spinners";
import NavButton from "./NavButton";

const LogComments = ({ logId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", logId],
    queryFn: () => getComments(logId),
  });

  console.log(comments);

  return (
    <div className="w-full m-2 border-[1px] border-gray-200 bg-white rounded-2xl ">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full p-4 px-6 cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-xl text-left font-semibold ml-2">
          Notes and comments
        </h2>
        <Icon
          path={mdiChevronDown}
          size={1.5}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t-[1px] mx-4 border-gray-200">
          <CommentInput logId={logId} />
          <div className="text-left my-5 ml-3 text-gray-500">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <ClipLoader color="#000000" size={30} />
              </div>
            ) : (
              comments?.map((comment) => {
                console.log("Comment:", comment);
                return <UserComment key={comment.id} comment={comment} />;
              })
            )}
          </div>
          <div className="flex w-fit place-self-end my-4 mx-1">
            <NavButton
              text={"See all comments"}
              route={`/dashboard/log/${logId}/comments`}
              icon={<Icon path={mdiOpenInNew} size={1} />}
              variant="dark"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogComments;
