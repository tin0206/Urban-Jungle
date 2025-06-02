"use client"

import { CartItem } from "@/app/model"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function CartItemList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("http://localhost:8000/api/shopping_cart/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setCartItems(data)
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error)
    })

  }, [])

  return (
    <div className="w-full h-full">
      {cartItems.length === 0 ? (
          <div className="w-full h-full">
            <div className="w-full flex items-center justify-center h-[763.125px] p-[21.44px]">
              <p className="font-navbar text-[16px] leading-[24px] mt-2.5 mb-7 text-[rgb(69,69,69)]">
                No products in the cart.
              </p>
            </div>
            <div className="w-full flex-1 p-4 flex justify-center">
              <Button 
                className="w-full p-[21.44px] rounded-3xl bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                onClick={() => router.push("/shop")}
              >
                <span className="font-navbar text-[16px] font-medium text-white">Continue Shopping</span>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            
          </div>
        )}
    </div>
  )
}
