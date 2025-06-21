"use client"

import { CgProfile } from "react-icons/cg"
import { Button } from "../ui/button"
import useUserStore from "@/stores/useUserStore"
import { useLoginModal } from "@/stores/useLoginModal"
import useLogOut from "@/stores/useLogOut"
import { useCartStore } from "@/stores/useCartStore"
import { CartItem } from "@/app/model"
import useLocalStorageCart from "@/stores/useLocalStorageCart"

type ProfileProps = {
  showMainMenu: boolean;
}

export default function Profile({ showMainMenu }: ProfileProps) {
  const { user, clearUser } = useUserStore()
  const { setShowLoginModal } = useLoginModal()
  const { showLogOut, setShowLogOut } = useLogOut()
  const { click, increment } = useCartStore()
  const { createCart, clearCart } = useLocalStorageCart()

  const synchronizeCart = async () => {
    const cartItems : CartItem[] = []
    await fetch("http://localhost:8000/api/shopping_cart/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      cartItems.push(...data)
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error)
    })

    if (cartItems.length === 0) {
      clearCart()
      createCart()
    }
    else {
      clearCart()
      const updateCart = cartItems.map((item) => {
        return {
          id: item.plant_id,
          quantity: item.quantity,
        }
      })

      localStorage.setItem("shopping_cart", JSON.stringify(updateCart))
      createCart()
    }
  }

  async function handleLogout() {
    await synchronizeCart()
    increment()
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      clearUser()
      setShowLogOut(false)
      localStorage.removeItem("jwt_token")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div 
      className="ml-3"
    >
      { user ? (
        <>
          <div className="w-full h-full relative z-30">
            <CgProfile 
              className={`${showMainMenu ? "text-white" : ""} size-6 cursor-pointer`} 
              onClick={() => setShowLogOut(!showLogOut)}
            />
            {
              showLogOut && (
                <Button 
                  className="mt-2 font-navbar cursor-pointer absolute w-[60px] h-[35px] text-[14px] translate-x-[-20px] transition duration-300"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              )
            }
          </div>
        </>
      ) : (
        <div>
          <Button
            className="font-navbar cursor-pointer transition duration-300"
            onClick={() => setShowLoginModal(true)}
          >
            <CgProfile className="size-6" />
            <span className="ml-2">Login</span>
          </Button>
        </div>
      )}
    </div>
  )
}
