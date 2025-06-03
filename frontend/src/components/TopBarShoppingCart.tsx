"use client"

import useShoppingCart from "@/stores/useShoppingCart"
import { Button } from "./ui/button"

export default function TopBarShoppingCart() {
  const { setShowShoppingCart } = useShoppingCart()

  return (
    <div className="flex items-center p-[21.440px] border-b justify-between w-full max-h-14">
      <div className="font-navbar text-[rgb(69,69,69)] text-[16px]">
        Shopping Cart
      </div>
      <Button 
        className="rounded-full text-[16px] cursor-pointer bg-white text-black border-2 hover:bg-white"
        onClick={() => setShowShoppingCart(false)}
      >
        X
      </Button>
    </div>
  )
}
