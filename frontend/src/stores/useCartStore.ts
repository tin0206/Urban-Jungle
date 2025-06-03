import { create } from "zustand";

interface CartState {
    click:  number;
    increment: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    click: 0,
    increment: () => set((state) => ({ click: state.click + 1 })),
}))