import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import UserComment from "./UserComment";
import Button from "./Button";
import { mdiOpenInNew } from "@mdi/js";
import CommentInput from "./CommentInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../queries/createComment";
import { getComments } from "../queries/getComments";
import { ClipLoader } from "react-spinners";

const LogComments = ({ logId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", logId],
    queryFn: () => getComments(logId),
    cacheTime: 0, // elimina datos en caché inmediatamente al desmontar
    staleTime: 0, // siempre se considera desactualizado
    refetchOnMount: true, // vuelve a pedir al montar
    refetchOnWindowFocus: true, // vuelve a pedir al volver a la pestaña
  });

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

  console.log(comments);

  return (
    <div className="w-full m-2 border-[1px] border-gray-200 bg-white rounded-2xl ">
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
        <div className="border-t-[1px] mx-4 border-gray-200">
          <form>
            <CommentInput
              value={comment}
              onChange={setComment}
              onSubmit={handleSubmit}
              disable={mutation.isLoading}
              finished={mutation.isSuccess}
            />
          </form>
          <div className="text-left my-5 ml-3 text-gray-500">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <ClipLoader color="#000000" size={30} />
              </div>
            ) : (
              comments?.map((comment) => {
                console.log("Comment:", comment);
                return <UserComment key={comment.id} comment={comment} />;
              })
            )}
          </div>
          <div className="flex w-fit place-self-end my-4 mx-1">
            <Button onClick={() => {}}>
              <Icon path={mdiOpenInNew} size={1} />
              See all comments
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogComments;
