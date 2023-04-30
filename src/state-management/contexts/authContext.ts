import { Dispatch, createContext } from "react";
import { AuthAction } from "../reducers/authReducer";

interface AuthContextType {
  user: string;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
