import { ReactNode, useReducer } from "react";
import { authReducer } from "./reducers/authReducer";
import { AuthContext } from "./contexts/authContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;

  const [user, dispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
