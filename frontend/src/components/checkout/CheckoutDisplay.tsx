"use client"

import { useEffect, useState } from "react"
import { LuShoppingCart } from "react-icons/lu"
import { CountrySelect } from 'react-country-state-city'
import 'react-country-state-city/dist/react-country-state-city.css'
import { CartItem } from "@/app/model"
import { Button } from "../ui/button"
import useUserStore from "@/stores/useUserStore"
import { useCartStore } from "@/stores/useCartStore"
import useLocalStorageCart from "@/stores/useLocalStorageCart"

export default function CheckoutDisplay() {
  const [couponClick, setCouponClick] = useState(false)
  const [country, setCountry] = useState<string>("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subTotal, setSubtotal] = useState<number[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { user } = useUserStore()
  const { click, increment } = useCartStore()
  const { cart, deleteItems } = useLocalStorageCart()

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
          const prices = data.plants.map((item: CartItem) => item.price * (cart.find(cartItem => cartItem.id === item.id)?.quantity || 0))
          setSubtotal(prices)
          const total = prices.reduce((acc: number, price: number) => acc + price, 0)
          setTotalPrice(total)
          if (data.removed_plants.length > 0) {
            deleteItems(data.removed_plants)
          }
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
          const prices = data.map((item: CartItem) => item.price * item.quantity)
          setSubtotal(prices)
          const total = prices.reduce((acc: number, price: number) => acc + price, 0)
          setTotalPrice(total)
        }) 
        .catch((error) => {
          console.error("Error fetching cart items:", error)
        })
      }
    }

    fetchCartItems()
  }, [click, user])

  return (
    <div className="w-full">
      <h1 className="mt-2 xl:mt-0 mb-[17.51px] md:mb-[19.2px] text-[rgb(34,34,34)] text-[29.184px] md:text-[32px] leading-[35.0208px] md:leading-[38.4px] font-semibold">
        Checkout
      </h1>
      <div className="w-full bg-[rgb(247,246,247)] border-t-[3px] border-t-[rgb(136,173,53)] py-[14.592px] md:py-4 px-[29.184px] md:px-8 mb-[29.184px] md:mb-8">
        <div className="flex items-center gap-4">
          <LuShoppingCart className="size-[20px] text-[rgb(136,173,53)]" />
          <div className="pl-[5px] flex gap-x-1">
            <div className="font-navbar text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
              Have a coupon?
            </div>
            <div 
              className="font-navbar text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(136,173,53)] hover:text-[rgb(105,137,39)] cursor-pointer"
              onClick={() => setCouponClick(!couponClick)}
            >
              Click here to enter your code
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full overflow-hidden transition-all duration-400 ease-in-out ${couponClick ? "max-h-[100px] mb-[29.184px] md:mb-8" : "max-h-0 mb-0"}`}>
        <div className="w-full h-[70px]">
          <form action="post">
            <div className="md:w-1/2 grid grid-cols-2 gap-x-2.5">
              <input 
                type="text" 
                placeholder="Coupon code" 
                className="border h-10 font-navbar text-[rgb(71,85,105)] py-[9px] px-3" 
              />
              <div className="flex items-center justify-start">
                <button 
                  type="submit" 
                  className="bg-[rgb(136,173,53)] rounded-3xl cursor-pointer text-white font-navbar text-[14.592px] leading-[19.6992px] h-[34.25px] w-[122.484px] px-[14.592px] py-[7.296px] hover:bg-[rgb(105,137,39)] transition-colors duration-200"
                >
                  Apply coupon
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-1 md:col-span-3">
          <div className="mb-[29.184px] md:mb-8 md:mr-[40px] lg:mr-[45px] xl:mr-[52.172px]">
            <form action="post">
              <div className="h-[61px] w-full pt-5 pb-3.5 mb-5 border-b text-[26px] font-medium">
                Billing details
              </div>
              <div className="w-full">
                <div className="w-full h-[74.825px] grid grid-cols-2 gap-x-4 mb-1.5">
                  <div>
                    <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                      First name <span className="text-red-500">*</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="First name" 
                      className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                      required
                    />
                  </div>
                  <div>
                    <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                      Last name <span className="text-red-500">*</span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Last name" 
                      className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                      required
                    />
                  </div>
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Company name (optional)
                  </div>
                  <input 
                    type="text" 
                    placeholder="Company name" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Country / Region <span className="text-red-500">*</span>
                  </div>
                  <CountrySelect
                    className="h-10 font-navbar text-[rgb(71,85,105)] py-2 pl-[12.8px] pr-8 w-full"
                    onChange={(country: any) => setCountry(country.name)}
                    required
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Street address <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Street address" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Postcode / ZIP (optional)
                  </div>
                  <input 
                    type="text" 
                    placeholder="Postcode / ZIP" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Town / City <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Town / City" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Phone <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Email address <span className="text-red-500">*</span>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                    required
                  />
                </div>
                <div className="mb-5 h-[61px] pt-5 pb-3.5 text-[26px] font-medium text-[rgb(34,34,34)] border-b">
                  Additional information
                </div>
                <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                  Order notes (optional)
                </div>
                <textarea 
                  placeholder="Notes about your order, e.g. special notes for delivery." 
                  className="border h-16 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full mb-[29.184px] md:mb-8"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 mb-5 md:mb-0">
          <div className="w-full border-2">
            <div className="w-full h-[85px] md:h-[93px] px-[35.568px] sm:px-[38.304px] md:px-[39px] pt-[35.568px] sm:pt-[38.304px] md:pt-[39px] pb-[23.712px] sm:pb-[25.536px] md:pb-[26px] text-[26px] text-[rgb(34,34,34)] font-medium">
              Your order
            </div>
            <div className="px-[29.184px] md:px-8 w-full">
              <div className="w-full py-3.5 h-[51px] text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)] font-navbar border-b font-bold flex items-center justify-between">
                <div>
                  Product
                </div>
                <div>
                  Subtotal
                </div>
              </div>
              <ul>
                {
                  cartItems.map((item: CartItem, index) => (
                    <li key={index} className="w-full py-2.5 border-b text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)] font-navbar flex items-center justify-between">
                      <div>
                        {item.plant_name} x {user !== null ? item.quantity : findQuantity(item.id)}
                      </div>
                      <div>
                        ${subTotal[index].toFixed(2)}
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="w-full py-3.5 h-[51px] text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)] font-navbar border-b font-bold flex items-center justify-between">
                <div>
                  Total
                </div>
                <div>
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
              <Button className="mt-6 mb-4 bg-[rgb(136,173,53)] rounded-3xl cursor-pointer text-white font-navbar text-[14.592px] leading-[19.6992px] h-[46px] w-full px-[30px] py-[15px] hover:bg-[rgb(105,137,39)] transition-colors duration-200">
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
