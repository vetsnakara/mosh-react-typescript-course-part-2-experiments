import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (username: string) => set(() => ({ user: username })),
  logout: () => set(() => ({ user: "" })),
}));
