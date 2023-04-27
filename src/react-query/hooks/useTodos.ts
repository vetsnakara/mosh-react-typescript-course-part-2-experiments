import { useQuery } from "@tanstack/react-query";

import { CACHE_KEY_TODOS } from "../constants";
import { Todo, todoService } from "../services/todoService";

export const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
  });
