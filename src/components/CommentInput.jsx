import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import UserIconSmall from "./UserIconSmall";
import { createComment } from "../queries/createComment";
import { useState } from "react";

const CommentInput = ({ logId, inactive = false }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ logId, comment }) => {
      createComment(logId, comment);
    },
    onSuccess: () => {
      setComment("");
      setSuccess(true);
      queryClient.invalidateQueries(["comments", logId]);
    },
    onError: (error) => {
      console.error("Error al crear el comentario", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() === "") return;

    mutation.mutate({ logId, comment });
  };

  return (
    <form className="items-center text-left  flex">
      <UserIconSmall name={userData?.fullName} />
      <div className="flex w-full ml-4 items-center bg-[#ededed] px- py-[1px] rounded-lg">
        <input
          type="text"
          value={comment}
          minLength={50}
          disabled={inactive}
          maxLength={5000}
          onChange={(e) => {
            setComment(e.target.value);
            setSuccess(false);
          }}
          placeholder="Enter comment"
          className=" flex-1 px-3 py-3 rounded-xl bg-[#ededed]"
        />
        <div className="w-fit mr-1">
          <Button
            type="submit"
            onClick={handleSubmit}
            active
            disabled={mutation.isPending || !comment.trim() || inactive}
          >
            {success && !comment ? "Comment added" : "Send"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentInput;
