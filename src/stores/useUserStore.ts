// useUserStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UserState = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  branch: string;
  bio: string;
  totalTasks: number;
  pendingTask: number;
  inTimeCompletedTask: number;
  overTimeCompletedTask: number;
  milestonesAchieved: number;
  rank: number;
};

type UserStore = {
  user: UserState | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserState) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    { name: "UserStore" }
  )
);

export default useUserStore;
