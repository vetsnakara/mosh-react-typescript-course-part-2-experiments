import { ApiClient } from "./apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const todoService = new ApiClient<Todo>("/todos");
