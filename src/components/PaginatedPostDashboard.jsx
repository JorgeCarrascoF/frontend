import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import {testApi as api} from "../api";

const POSTS_PER_PAGE = 10;

const PaginatedPostDashboard = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: ["posts", page],
    queryFn: () =>
      api
        .get("/posts", {
          params: { _page: page, _limit: POSTS_PER_PAGE },
        })
        .then((res) => res.data),
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {data.map((post) => (
          <li
            key={post.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page == 1}
        >
          {" "}
          Página anterior{" "}
        </button>
        <span> {page} </span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPreviousData || data.length < POSTS_PER_PAGE}
        >
          {" "}
          Página siguiente{" "}
        </button>
      </div>
    </div>
  );
};

export default PaginatedPostDashboard;
