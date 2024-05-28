// useUserStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface FriendResponse {
  id: number;
  username: string;
  fullName: string;
  email: string;
  branch: string;
  profile: string | null;
  rank: number;
}
export type FriendListResponseState = FriendResponse[];

type FriendListStore = {
  friends: FriendListResponseState | null;
  loading: boolean;
  error: string | null;
  setFriends: (friends: FriendListResponseState) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

const useFriensListStore = create<FriendListStore>()(
  devtools(
    (set) => ({
      friends: null,
      loading: false,
      error: null,
      setFriends: (friends) => set({ friends }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    { name: "FriendStore" }
  )
);

export default useFriensListStore;
