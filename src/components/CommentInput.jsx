import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import UserIconSmall from "./UserIconSmall";
import { createComment } from "../queries/createComment";
import { useState } from "react";

const CommentInput = ({ logId }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ logId, comment }) => {
      createComment(logId, comment);
    },
    onSuccess: () => {
      setComment("");
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
    <form className="items-center text-left my-5 ml-3  flex px-3">
      <UserIconSmall user={userData} />
      <input
        type="text"
        value={comment}
        minLength={50}
        maxLength={5000}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter comment"
        className=" ml-2 flex-1 px-4 py-3 rounded-xl bg-[#ededed]"
      />
      <div className="w-fit ml-2">
        <Button
          type="submit"
          onClick={handleSubmit}
          active
          disabled={mutation.isPending || !comment.trim()}
        >
          {mutation.isSuccess ? "Comment added" : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
