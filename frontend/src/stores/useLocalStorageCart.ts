import { CartItem } from "@/app/model";
import { create } from "zustand";

interface LocalStorageCartStore {
    cart: CartItem[];
    createCart: () => void;
    updateCart: (cart: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    deleteItems: (itemId: number[]) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
}

const useLocalStorageCart = create<LocalStorageCartStore>((set) => ({
    cart: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("shopping_cart") || "[]") : [],

    createCart: () => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("shopping_cart")) {
                set({
                    cart: JSON.parse(localStorage.getItem("shopping_cart") || "[]"),
                });
            } else {
                localStorage.setItem("shopping_cart", JSON.stringify([]));
                set({ cart: [] });
            }
        }
    },

    addItem: (item: CartItem) => {
        set((state) => {
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
            let updatedCart;
            if (existingItemIndex > -1) {
                const updatedItem = {
                    ...state.cart[existingItemIndex],
                    quantity: state.cart[existingItemIndex].quantity + item.quantity
                };
                updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = updatedItem;
            }
            else {
                updatedCart = [...state.cart, item];
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("shopping_cart", JSON.stringify(updatedCart));
            }

            return { cart: updatedCart };
        })
    },

    deleteItems: (itemIds: number[]) => {
        set((state) => {
            const updatedCart = state.cart.filter(item => !itemIds.includes(item.id));
            if (typeof window !== "undefined") {
                localStorage.setItem("shopping_cart", JSON.stringify(updatedCart));
            }
            return { cart: updatedCart };
    })},

    updateCart: (cart: CartItem[]) => {
        set((state) => {
            state.cart.forEach(item => {
                const updatedItem = cart.find(cartItem => cartItem.id === item.id);
                if (updatedItem) {
                    item.quantity = updatedItem.quantity;
                }
            })

            if (typeof window !== "undefined") {
                localStorage.setItem("shopping_cart", JSON.stringify(state.cart));
            }

            return { cart: state.cart };
        })
    },

    removeItem: (itemId: number) => {
        set((state) => {
            const updatedCart = state.cart.filter(item => item.id !== itemId);
            localStorage.setItem("shopping_cart", JSON.stringify(updatedCart));
            if (typeof window !== "undefined") {
                localStorage.setItem("shopping_cart", JSON.stringify(updatedCart));
            }
            return { cart: updatedCart };
        });
    },

    clearCart: () => {
        localStorage.removeItem("shopping_cart");
        return set({ cart: [] });
    },
}))

export default useLocalStorageCart