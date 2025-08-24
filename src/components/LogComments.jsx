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

const LogComments = ({ logId, inactive }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.id

  const {
    data: comments,
    isLoading,
  } = useQuery({
    queryKey: ["comments", logId],
    queryFn: () => getComments(logId),
  });


  return (
    <div className={`w-full m-2 border border-gray-200 bg-white rounded-2xl ${inactive ? "text-[#737373]" : "text-black"} `}>
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
        <div className="border-t mx-4 border-gray-200">
          <CommentInput logId={logId} inactive={inactive} />
          <div className="text-left my-5 ml-3 text-gray-500">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <ClipLoader color="#000000" size={30} />
              </div>
            ) : (
              <>
                {comments?.data.length > 0 ? (
                  comments?.data.map((comment) => {
                    return <div className="mx-12 border-b border-gray-200 py-3"><UserComment key={comment.id} comment={comment} currentUserId={userId} /></div>;
                  })
                ) : (
                  <div className="ms-20 mt-5">There are no comments for this log.</div>
                )}
              </>
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
