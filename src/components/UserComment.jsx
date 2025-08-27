import { useState } from "react";
import UserIconSmall from "./UserIconSmall";
import { formatDate } from "../utils/formatDate";
import { mdiPencil, mdiContentCopy, mdiCheck, mdiPin } from "@mdi/js";
import Icon from "@mdi/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateComment from "../queries/updateComment";
import { ClipLoader } from "react-spinners";
import { mdiContentSaveOutline } from "@mdi/js";
import { mdiClose } from "@mdi/js";

const UserComment = ({ comment, currentUserId }) => {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  console.log(comment)

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params) => updateComment(comment.id, params),
    onSuccess: (data) => {
      console.log("Comment updated successfully:", data);
      queryClient.invalidateQueries(["comments", comment.id]);
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });

  // !! Duplicado para gestionar correctamente el spinner en dos iconos diferentes
  const editMutation = useMutation({
    mutationFn: (params) => updateComment(comment.id, params),
    onSuccess: (data) => {
      console.log("Comment updated successfully:", data);
      queryClient.invalidateQueries(["comments", comment.id]);
    },
    onError: (error) => {
      console.error("Error updating comment:", error);
    },
  });

  const canEditComment = (date) => {
    const EDIT_TIME = 5 * 60 * 1000;
    const commentDate = new Date(date);
    const now = new Date();

    const diff = now - commentDate;
    return diff <= EDIT_TIME && diff >= 0;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(comment.text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copiando comentario", err);
    }
  };

  const handlePin = async (newPinned) => {
    mutation.mutate({ pinned: newPinned });
  };

  const handleEdit = async () => {
    editMutation.mutate({ text: newCommentText });
  };

  const isOwner = comment.user?.id === currentUserId;
  const canEdit = canEditComment(comment.create_at);

  return (
    <div className="p-3 flex items-center">
      <div className="w-[3.125rem] aspect-square mr-4">
        <UserIconSmall name={comment.user?.fullName || "Default User"} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-gray-800">
              {comment.user?.fullName || "Default User"}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(comment.create_at) || "Unknown Date"}
            </span>
          </div>
          <div className="flex gap-2 text-gray-500 mt-3">
            {isOwner && editing && (
              <button
                onClick={() => {
                  setEditing(false);
                  setNewCommentText("");
                }}
                className="hover:text-gray-700 -mr-1 hover:cursor-pointer"
                title="Cancel editing"
              >
                <Icon path={mdiClose} size={1} />
              </button>
            )}
            {isOwner && canEdit && (
              <button
                onClick={() => {
                  if (!editMutation.isPending) {
                    setEditing(!editing);
                    if (editing) handleEdit();
                  }
                }}
                className="hover:text-gray-700 hover:cursor-pointer"
                title="Edit comment"
              >
                {editMutation.isPending ? (
                  <ClipLoader size={15} />
                ) : (
                  <Icon
                    path={editing ? mdiContentSaveOutline : mdiPencil}
                    size={1}
                  />
                )}
              </button>
            )}
            <button
              onClick={handleCopy}
              className="hover:text-gray-700 hover:cursor-pointer"
              title="Copy comment"
            >
              {copied ? (
                <Icon path={mdiCheck} size={1} />
              ) : (
                <Icon path={mdiContentCopy} size={1} />
              )}
            </button>
            <button
              onClick={() => handlePin(!comment.pinned)}
              className="hover:text-gray-700 hover:cursor-pointer"
              title="Pin comment"
            >
              {" "}
              {mutation.isPending ? (
                <div className="flex items-center">
                  <ClipLoader size={15} />
                </div>
              ) : (
                <Icon
                  path={mdiPin}
                  size={1}
                  color={comment.pinned ? "#295ba2" : "gray"}
                />
              )}
            </button>
          </div>
        </div>
        {editing ? (
          <input
            className="text-gray-700 text-left border rounded-md px-1 mt-1 whitespace-pre-wrap"
            onChange={(e) => setNewCommentText(e.target.value)}
            maxLength={5000}
            minLength={100}
            defaultValue={comment.text || "No comment text available"}
          />
        ) : (
          <p className="text-gray-700 border border-transparent px-1 text-left mt-1 whitespace-pre-wrap">
            {comment.text || "No comment text available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserComment;
