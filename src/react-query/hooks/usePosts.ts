import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const usePosts = (userId: string | undefined) => {
  const fetchPosts =
    (config: AxiosRequestConfig = {}) =>
    () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", config)
        .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"], // like deps array in useEffect
    queryFn: fetchPosts({
      params: {
        userId,
      },
    }),
    staleTime: 1 * 60 * 1000, // 1min
  });
};
