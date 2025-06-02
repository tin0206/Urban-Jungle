import { create } from "zustand"

interface ShoppingCartStore {
    showShoppingCart: boolean;
    setShowShoppingCart: (value: boolean) => void;
}

const useShoppingCart = create<ShoppingCartStore>((set) => ({
    showShoppingCart: false,
    setShowShoppingCart: (value: boolean) => set({ showShoppingCart: value }),
}))

export default useShoppingCart