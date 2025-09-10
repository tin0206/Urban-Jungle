"use client"

import { useCartStore } from "@/stores/useCartStore";
import useLocalStorageCart from "@/stores/useLocalStorageCart";
import useShoppingCart from "@/stores/useShoppingCart";
import useUserStore from "@/stores/useUserStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa"

type ShoppingCartProps = {
    showMainMenu: boolean;
}

export default function ShoppingCart({ showMainMenu }: ShoppingCartProps) {
    const { setShowShoppingCart } = useShoppingCart()
    const [quantity, setQuantity] = useState(0)
    const { click } = useCartStore()
    const path = usePathname()
    const { user } = useUserStore()
    const { cart } = useLocalStorageCart()

    useEffect(() => {
        const fetchCartQuantity = async () => {
            if (user === null) {
                setQuantity(cart.length)
            }
            else if (user.role !== "admin") {
                fetch("https://urban-jungle-production.up.railway.app/api/shopping_cart/quantity", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    setQuantity(data.total_quantity)
                })
                .catch((error) => {
                    console.error("Error fetching cart items:", error)
                })
            }
        }

        fetchCartQuantity()
    }, [click, user, cart]);

    return (
        <div
            className="cursor-pointer flex items-center pl-2.5"
            onClick={() => {
                if (path !== "/cart") {
                    setShowShoppingCart(true)
                }
            }}
        >
            <FaShoppingBag className={`${showMainMenu ? "text-white" : "text-[rgb(136,173,53)]"} size-5`} />
            <div className="translate-y-[-10px] size-5 flex items-center justify-center border rounded-full bg-white">
                <span className="text-[11px]">
                    {quantity}
                </span>
            </div>
        </div>
    )
}
