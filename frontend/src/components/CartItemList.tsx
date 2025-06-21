"use client"

import { CartItem } from "@/app/model"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useCartStore } from "@/stores/useCartStore"
import Link from "next/link"
import useShoppingCart from "@/stores/useShoppingCart"
import useUserStore from "@/stores/useUserStore"
import useLocalStorageCart from "@/stores/useLocalStorageCart"

export default function CartItemList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [showLoading, setShowLoading] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { click, increment } = useCartStore()
  const { user } = useUserStore()
  const { setShowShoppingCart } = useShoppingCart()
  const { cart, deleteItems, removeItem } = useLocalStorageCart()

  const findQuantity = (id: number) => {
    const quantity = cart.find((item: CartItem) => item.id === id)?.quantity
    return quantity
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user === null) {
        const plants_ids = cart.map((item: CartItem) => item.id)
        await fetch("http://localhost:8000/api/plants/localStorage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plants_id: plants_ids }),
        })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.plants)
          if (data.removed_plants.length > 0) {
            deleteItems(data.plants_removed)
          }
          const totalMount = data.plants.reduce((acc: number, item: CartItem) => {
            const quantity = cart.find((cartItem: CartItem) => cartItem.id === item.id)?.quantity
            return acc + (item.price * (quantity || 0))
          }, 0)
          setSubtotal(totalMount)
        })
        .catch((error) => {
          console.error("Error fetching plants from localStorage:", error)
        })
      }
      else {
        await fetch("http://localhost:8000/api/shopping_cart/items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data)
          const totalMount = data.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0)
          setSubtotal(totalMount)
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error)
        })
      }
    }
    setIsLoading(true)
    fetchCartItems()
    setIsLoading(false)
  }, [click, user, cart])

  async function handleRemoveItem(itemId: number) {
    setIsLoading(true)
    if (user == null) {
      setTimeout(() => {
        removeItem(itemId)
        setIsLoading(false)
        setShowLoading(null)
        increment()
      }, 1000)
    }
    else {
      try {
        await fetch(`http://localhost:8000/api/shopping_cart/removeItem`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({ item_id: itemId }),
        })
      } catch (error) {
        console.error("Error removing item from cart:", error) 
      }

      setTimeout(() => {
        setIsLoading(false)
        setShowLoading(null)
        increment()
      }, 1000)
    }
  }

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
              <Link href={"/shop"}>
                <Button 
                  className="w-full p-[21.44px] rounded-3xl bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                >
                  <span className="font-navbar text-[16px] font-medium text-white">Continue Shopping</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <div className="w-full h-[653.75px] overflow-y-auto">
              <ul className="w-full h-full flex flex-col p-[20.8px]">
                {cartItems.map((item, id) => (
                  <li key={id} className="w-full relative flex py-[19.2px] gap-x-2.5 border-b last:border-b-0">
                    <div>
                      <Link href={`/product/${item.plant_name.replace(/\s+/g, '-').toLowerCase()}`}>
                        <img src="/default.jpg" alt="" className="size-[64px] mb-2 cursor-pointer" />
                      </Link>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between mb-[5.28px]">
                        <Link href={`/product/${item.plant_name.replace(/\s+/g, '-').toLowerCase()}`}>
                          <h3 className="text-[16px] cursor-pointer font-navbar text-[rgb(34,34,34)] leading-[24px]">{item.plant_name}</h3>
                        </Link>
                        <Button
                          variant={"ghost"}
                          className="size-5 rounded-full border-2 cursor-pointer p-[10px] text-gray-400 bg-white hover:text-black hover:border-black"
                          disabled={showLoading === id && isLoading}
                          onClick={() => {
                          setShowLoading(id)
                          handleRemoveItem(item.id)
                        }}
                        >
                          x
                        </Button>
                      </div>
                      <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px]">
                        {user !== null ? item.quantity : findQuantity(item.id)} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    {showLoading === id && isLoading && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-50">
                        <div role="status">
                          <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 w-full h-[48.375px] py-[11.2px] px-[25px] flex justify-between border-y">
              <p className="font-navbar font-medium text-[16px] leading-[24px] text-[rgb(34,34,34)] pr-2">
                Subtotal:
              </p>
              <p className="font-navbar font-medium text-[16px] leading-[24px] text-[rgb(34,34,34)]">
                ${subtotal.toFixed(2)}
              </p>
            </div>
            <div className="w-full flex-1 p-[21.44px] flex flex-col">
              <Link 
                href={"/cart"}
                onClick={() => setShowShoppingCart(false)}
              >
                <Button 
                  className="w-full h-[46px] py-[15px] px-[30px] rounded-3xl bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer mr-2.5 mb-[5px]"
                >
                  <span className="font-navbar text-[16px] font-medium text-white">View cart</span>
                </Button>
              </Link>
              <Link
                href={"/checkout"}
                onClick={() => setShowShoppingCart(false)}
              >
                <Button 
                  className="w-full h-[46px] py-[15px] px-[30px] rounded-3xl bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer mr-2.5 mt-[10px]"
                >
                  <span className="font-navbar text-[16px] font-medium text-white">Checkout</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
    </div>
  )
}
