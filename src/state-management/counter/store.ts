import { create } from "zustand";

interface CounterStore {
  counter: number;
  increment: () => void;
  reset: () => void;
}

console.log("create");

export const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  increment: () => set((store) => ({ counter: store.counter + 1 })),
  reset: () => set(() => ({ counter: 0 })),
}));
