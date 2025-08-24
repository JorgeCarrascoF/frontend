import { useState } from "react";
import UserIconSmall from "./UserIconSmall";
import { formatDate } from "../utils/formatDate";
import { Pencil, Copy, Pin, Check } from "lucide-react";

const UserComment = ({ comment, currentUserId, onEdit, onPin }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(comment.text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copiando comentario", err);
    }
  };

  const isOwner = comment.user?.id === currentUserId;

  return (
    <div className="p-3 flex items-start">
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
            {isOwner && (
              <button
                onClick={() => onEdit?.(comment)}
                className="hover:text-gray-700 hover:cursor-pointer"
                title="Editar comentario"
              >
                <Pencil size={20} />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="hover:text-gray-700 hover:cursor-pointer"
              title="Copiar comentario"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
            <button
              onClick={() => onPin?.(comment)}
              className="hover:text-gray-700 hover:cursor-pointer"
              title="Fijar comentario"
            >
              <Pin size={20} />
            </button>
          </div>
        </div>
        <p className="text-gray-700 text-left mt-1 whitespace-pre-wrap">
          {comment.text || "No comment text available"}
        </p>
      </div>
    </div>
  );
};

export default UserComment;