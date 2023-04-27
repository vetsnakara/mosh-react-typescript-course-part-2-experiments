import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { CACHE_KEY_TODOS } from "../constants";
import { Todo } from "./useTodos";

interface AddTodoContext {
  prevTodos: Todo[];
}

interface UseAddTodoOptions {
  onAdd?: () => void;
}

export const useAddTodo = (options: UseAddTodoOptions) => {
  const { onAdd } = options;

  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },

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
