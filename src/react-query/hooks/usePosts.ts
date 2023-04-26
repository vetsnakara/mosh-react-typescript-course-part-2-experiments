import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

export const usePosts = (query: PostQuery) => {
  const fetchPosts =
    (config: AxiosRequestConfig = {}) =>
    () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", config)
        .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts({
      params: {
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize,
      },
    }),
    staleTime: 1 * 60 * 1000, // 1min
    keepPreviousData: true, // no isLoading=true between queries
  });
};
