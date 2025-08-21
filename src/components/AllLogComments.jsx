import { useQuery } from "@tanstack/react-query";
import { getComments } from "../queries/getComments";
import { getLogById } from "../queries/getLogById";
import UserComment from "./UserComment";
import CommentInput from "./CommentInput";
import { ClipLoader, PulseLoader } from "react-spinners";

const AllLogComments = ({ logId }) => {
  const { data: log, isLoading: isLoadingLog } = useQuery({
    queryKey: ["log", logId],
    queryFn: () => getLogById(logId),
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", logId],
    queryFn: () => getComments(logId),
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 border-[1px] border-gray-200 bg-white rounded-2xl py-5 px-6">
      <div className="flex flex-col items-start mb-2">
        <h2 className="font-bold text-2xl text-left truncate overflow-hidden w-full">
          Notes and comments/{" "}
          {isLoadingLog ? (
            <div className="inline-block">
              <PulseLoader color="#000000" size={5} />
            </div>
          ) : (
            log?.message
          )}
        </h2>
        <span className="text-left text-md text-gray-500 ">
          {isLoadingLog ? (
            <PulseLoader color="#000000" size={5} />
          ) : (
            <>
              {" "}
              Priority: {log?.priority} | Status: {log?.status}
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-2 mx-[12px] h-[62vh] overflow-y-scroll">
        {isLoadingComments ? (
          <div className="w-full mt-20 flex items-center justify-center">
            <ClipLoader color="#000000" size={50} />
          </div>
        ) : comments.data.length < 1 ? (
          <span className="text-left">There are no comments for this log.</span>
        ) : (
          comments?.data.map((comment) => (
            <UserComment key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <CommentInput logId={logId} />
    </div>
  );
};

export default AllLogComments;
