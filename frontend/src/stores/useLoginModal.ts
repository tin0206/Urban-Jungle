import { create } from "zustand"

interface LoginModalState {
    showLoginModal: boolean;
    setShowLoginModal: (isOpen: boolean) => void;
}

export const useLoginModal = create<LoginModalState>((set) => ({
    showLoginModal: false,
    setShowLoginModal: (value: boolean) => set({ showLoginModal: value}),
}))