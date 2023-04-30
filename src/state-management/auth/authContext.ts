import { Dispatch, createContext } from "react";
import { AuthAction } from "./AuthProvider";

interface AuthContextType {
  user: string;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
