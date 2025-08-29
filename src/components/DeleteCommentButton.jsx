import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import deleteComment from "../queries/deleteComment";
import { ClipLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";

const DeleteCommentButton = ({ logId, commentId }) => {
  const [deleting, setDeleting] = useState(false);
  const [showingModal, setShowingModal] = useState(false);
  const [coords, setCoords] = useState(null);
  const modalRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowingModal(false);
      }
    };

    if (showingModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showingModal]);

  const handleDelete = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowingModal(true);
  };

  const confirmDelete = () => {
    setDeleting(true);
    setShowingModal(false);
    mutation.mutate(commentId);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleDelete}
        className="hover:text-gray-700 hover:cursor-pointer h-full flex items-center"
        title="Delete comment"
      >
        {deleting ? (
          <ClipLoader size={15} />
        ) : (
          <Icon path={mdiDelete} size={1} />
        )}
      </button>

      {showingModal &&
        createPortal(
          <div
            ref={modalRef}
            style={{
              position: "absolute",
              top: coords?.top,
              left: coords?.left - 200,
              zIndex: 9999,
            }}
            className="absolute z-10 py-6 bg-white flex flex-col border border-gray-300 rounded-md shadow-lg -top-30 right-20 p-10 2xl:w-[400px]"
          >
            <div className="w-full flex justify-center">
              <WarningAmberRoundedIcon
                className="text-yellow-500 mb-2"
                fontSize="large"
              />
            </div>
            <h2 className="text-2xl text-black font-semibold mb-4 text-center">
              Are you sure you want to delete this message?
            </h2>
            <span className="text-[#737373] mb-4 text-center">
              Deleted messages will no longer be accessible in the system
            </span>
            <div className="flex justify-center w-full gap-2">
              <div className="w-[145px]">
                <Button
                  onClick={() => setShowingModal(false)}
                  variant="tertiary"
                >
                  Cancel
                </Button>
              </div>
              <div className="w-[145px]">
                <Button
                  className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DeleteCommentButton;
