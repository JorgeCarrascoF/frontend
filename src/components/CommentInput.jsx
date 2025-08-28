import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import UserIconSmall from "./UserIconSmall";
import { createComment } from "../queries/createComment";
import { useState } from "react";
import useToast from "../hooks/useToast";
import checkUrl from "../queries/checkUrl";

const CommentInput = ({ logId, inactive = false }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const { showToast, ToastContainer } = useToast();

  const mutation = useMutation({
    mutationFn: ({ logId, comment }) => {
      return createComment(logId, comment);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mantener este código comentado hasta que tengamos el endpoint de check-url

    const urlRegex =
      /\b((https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?\b/g;

    const urls = comment.match(urlRegex) || [];

    if (urls.length > 0) {
      let urlsValid = true;
      for (let url of urls) {
        const response = await checkUrl(url);

        if (!response.isValid) {
          urlsValid = false;
        }
      }
      if (!urlsValid) {
        showToast("Your comments include broken links", "error");
        return;
      }
    }

    if (comment.trim() === "") return;

    mutation.mutate({ logId, comment });
  };

  // const checkLink = async (url) => {
  //   try {
  //     const response = await fetch(url, { method: "HEAD" });
  //     return response.ok;
  //   } catch (error) {
  //     console.log("Error checking link:", error);
  //     return false;
  //   }
  // };

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
      <ToastContainer />
    </form>
  );
};

export default CommentInput;
