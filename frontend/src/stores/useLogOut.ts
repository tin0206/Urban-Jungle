import { create } from "zustand";

interface  LogOutStore {
    showLogOut: boolean;
    setShowLogOut: (value: boolean) => void;
}

const useLogOut = create<LogOutStore>((set) => ({
    showLogOut: false,
    setShowLogOut: (value: boolean) => set({ showLogOut: value }),
}))

export default useLogOut