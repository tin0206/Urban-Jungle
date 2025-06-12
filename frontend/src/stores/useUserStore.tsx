import { User } from "@/app/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-storage' }
  )
)

export default useUserStore