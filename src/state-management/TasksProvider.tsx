import { ReactNode, useReducer } from "react";
import { tasksReducer } from "./reducers/tasksReducer";
import { TasksContext } from "./contexts/tasksContext";

interface Props {
  children: ReactNode;
}

export const TasksProvider = (props: Props) => {
  const { children } = props;

  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
