import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

export const usePosts = (query: PostQuery) => {
  const fetchPosts = ({ pageParam = 1 }: QueryFunctionContext) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};
