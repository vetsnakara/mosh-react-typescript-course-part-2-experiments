type State = number;

interface Action {
  type: "INCREMENT" | "RESET";
}

export const counterReducer = (state: State, action: Action): State => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "RESET") return 0;
  return state;
};
