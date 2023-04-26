import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import axios from "axios";

import { Todo } from "./hooks/useTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onSuccess: (savedTodo, newTodo) => {
      // APPROACH 1: Invalidating the cache (doesn't work with jsonplaceholder)
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // APPROACH 2: Updating data in the cache directly
      queryClient.setQueriesData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);

      if (ref.current) {
        ref.current.value = "";
      }
    },
  });

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current?.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
