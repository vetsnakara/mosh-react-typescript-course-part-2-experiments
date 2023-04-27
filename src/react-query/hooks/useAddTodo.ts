import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CACHE_KEY_TODOS } from "../constants";
import { ApiClient } from "../services/apiClient";

import { Todo } from "./useTodos";

interface AddTodoContext {
  prevTodos: Todo[];
}

const apiClient = new ApiClient<Todo>("/todos");

interface UseAddTodoOptions {
  onAdd?: () => void;
}

export const useAddTodo = (options: UseAddTodoOptions) => {
  const { onAdd } = options;

  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,

    // is called before mutation
    onMutate: (newTodo: Todo) => {
      const prevTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueriesData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd?.();

      // return context with prev data to use in onError callback
      return { prevTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // update added todo with saved todo from server (with ID)
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.prevTodos);
    },
  });
};
