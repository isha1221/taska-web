import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios"; // Import Axios for HTTP requests
import { Base_Url } from "../config/api.config";

export type UserState = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  branch: string;
  profile: string | null;
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
  getAuth: () => void; // Define the getAuth method
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
      getAuth: async () => {
        try {
          set({ loading: true, error: null });
          const response = await axios.get(`${Base_Url}/getAuth`, {
            withCredentials: true,
          });
          const userData = response.data;
          set({ user: userData, loading: false });
        } catch (error) {
          set({ loading: false, error: "Failed to authenticate user" });
        }
      },
    }),
    { name: "UserStore" }
  )
);

export default useUserStore;
