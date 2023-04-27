import { useQuery } from "@tanstack/react-query";

import { ApiClient } from "../services/apiClient";
import { CACHE_KEY_TODOS } from "../constants";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const apiClient = new ApiClient<Todo[]>("/todos");

export const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    staleTime: 10 * 1000,
  });
