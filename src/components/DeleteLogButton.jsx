import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import deleteLog from "../queries/deleteLog";

const DeleteLogButton = ({ logId, onDeleteSuccess, onError }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [tryingToDelete, setTryingToDelete] = useState(false);

  const deleteLogMutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      onDeleteSuccess();
    },
    onError: () => {
      onError();
    },
  });

  const handleDelete = async () => {
    if (!tryingToDelete) {
      setTryingToDelete(true);
      return;
    }
    setTryingToDelete(false);
    setIsDeleting(true);
    deleteLogMutation.mutate(logId, {
      onSettled: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white rounded-md px-4 py-2"
    >
      {tryingToDelete
        ? "¿Estás seguro?"
        : isDeleting
        ? "Eliminando..."
        : "Borrar log"}
    </button>
  );
};

export default DeleteLogButton;
