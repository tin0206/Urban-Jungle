"use client"

import { useCartStore } from "@/stores/useCartStore"
import { useState } from "react"
import { FaShoppingBag } from "react-icons/fa"

interface AddToCartProps {
  displayCart: number | null
  id: number
  plantId: number
}

export default function AddToCart( { displayCart, id, plantId }: AddToCartProps) {
  const [displayInstruction, setDisplayInstruction] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { increment } = useCartStore()

  async function addToCart(plantId: number) {
    setIsLoading(true)
    try {
      await fetch("http://localhost:8000/api/shopping_cart/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plant_id: plantId }),
      })
      increment()
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
    setTimeout(() => {
      setIsLoading(false)
      setDisplayInstruction(null)
    }, 1000)
  }

  return (
    <div>
      <div 
        className={`flex items-center justify-center absolute top-4 right-4 border-2 border-transparent bg-white rounded-full size-7
          ${displayCart === id ? "" : "hidden"}
        `}
        onClick={() => addToCart(plantId)} 
      >
        {isLoading ? (
          <div role="status">
              <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>
        ) : (
          <FaShoppingBag 
            className={`size-4 text-gray-500
            ${displayInstruction === id ? "text-gray-800" : ""}`}
            onMouseOver ={() => setDisplayInstruction(id)}
            onMouseOut={() => setDisplayInstruction(null)}
          />
        )}
      </div>
      <div 
        className={`absolute flex items-center top-3 right-12 ${displayInstruction === id ? "" : "hidden"}`}
      >
        <div className="text-white text-[10px] bg-black p-2 rounded-[5px]">Add to cart</div>
        <div className="border-l-[5px] border-t-[5px] border-b-[5px] border-l-black"></div>
      </div>
    </div>
  )
}
