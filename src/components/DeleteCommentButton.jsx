import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteComment from "../queries/deleteComment";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

<Icon path={mdiDelete} size={1} />;

const DeleteCommentButton = ({ logId, commentId }) => {
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      console.log(`Comment with commentId ${commentId} deleted successfully`);
      queryClient.invalidateQueries(["comments", logId]);
      setDeleting(false);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const handleDelete = () => {
    setDeleting(true);
    mutation.mutate(commentId);
  };

  return (
    <button
      onClick={handleDelete}
      className="hover:text-gray-700 hover:cursor-pointer flex items-center"
      title="Delete comment"
    >
      {deleting ? <ClipLoader size={15} /> : <Icon path={mdiDelete} size={1} />}
    </button>
  );
};

export default DeleteCommentButton;
