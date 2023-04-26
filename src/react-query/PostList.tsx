import React from "react";
import { usePosts } from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } =
    usePosts({
      pageSize,
    });

  if (isLoading) return <p>Loading ...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group mb-2">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3 ms-1"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </>
  );
};

export default PostList;
