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
  const [firstname, setFirstname] = useState<string>("")
  const [lastname, setLastname] = useState<string>("")
  const [country, setCountry] = useState<string>("Vietnam")
  const [countryPhoneCode, setCountryPhoneCode] = useState<string>("84")
  const [streetAddress, setStreetAddress] = useState<string>("")
  const [postcode, setPostcode] = useState<string>("")
  const [townCity, setTownCity] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [internationalPhone, setInternationalPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [orderNotes, setOrderNotes] = useState<string>("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subTotal, setSubtotal] = useState<number[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useUserStore()
  const { click, increment } = useCartStore()
  const { cart, deleteItems, clearCart, createCart } = useLocalStorageCart()

  const findQuantity = (id: number) => {
    const quantity = cart.find((item: CartItem) => item.id === id)?.quantity
    return quantity
  }

  const checkName = () => {
    if (firstname.trim() === "" || lastname.trim() === "") {
      alert("Please fill in your first and last name.")
      return false
    }
    return true
  }

  const checkCountry = () => {
    if (country.trim() === "") {
      alert("Please select a country.")
      return false
    }
    return true
  }

  const checkAddress = () => {
    if (streetAddress.trim() === "") {
      alert("Please fill in your street address.")
      return false
    }
    return true
  }

  const checkTownCity = () => {
    if (townCity.trim() === "") {
      alert("Please fill in your town/city.")
      return false
    }
    return true
  }

  const checkPhone = () => {
    if (phone.trim() === "") {
      alert("Please fill in your phone number.")
      return false
    }
    if (!/^\d+$/.test(phone)) {
      alert("Please enter a valid phone number.")
      return false
    }

    if (phone.startsWith("0")) {
      setInternationalPhone(`+${countryPhoneCode}${phone.slice(1)}`)
    }
    else {
      setInternationalPhone(`+${countryPhoneCode}${phone}`)
    }
    return true
  }

  const checkEmail = () => {
    if (email.trim() === "") {
      alert("Please fill in your email address.")
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.")
      return false
    }
    return true
  }

  const fetchCartItems = async () => {
    if (user === null) {
      const plants_ids = cart.map((item: CartItem) => item.id)
      await fetch("https://urban-jungle-production.up.railway.app/api/plants/localStorage", {
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
          deleteItems(data.removed_plants)
        }
        const prices = data.plants.map((item: CartItem) => item.price * (cart.find(cartItem => cartItem.id === item.id)?.quantity || 0))
        setSubtotal(prices)
        const total = prices.reduce((acc: number, price: number) => acc + price, 0)
        setTotalPrice(total)
      })
      .catch((error) => {
        console.error("Error fetching plants from localStorage:", error)
      })
    }
    else {
      await fetch("https://urban-jungle-production.up.railway.app/api/shopping_cart/items", {
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

  const handlePlaceOrder = async () => {
    if (!checkName() || !checkCountry() || !checkAddress() || !checkTownCity() || !checkPhone() || !checkEmail()) return

    const fetchCartItems_local = async () => {
       if (user === null) {
        const plants_ids = cart.map((item: CartItem) => item.id)
        const response = await fetch("https://urban-jungle-production.up.railway.app/api/plants/localStorage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plants_id: plants_ids }),
        })
        const data = await response.json()
        setCartItems(data.plants)
        if (data.removed_plants.length > 0) deleteItems(data.removed_plants)
        const prices = data.plants.map(
          (item: CartItem) => item.price * (cart.find(c => c.id === item.id)?.quantity || 0)
        )
        setSubtotal(prices)
        setTotalPrice(prices.reduce((a: any, b: any) => a + b, 0))
        return data.plants
      } else {
        const response = await fetch("https://urban-jungle-production.up.railway.app/api/shopping_cart/items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        })
        const data = await response.json()
        setCartItems(data)
        const prices = data.map((item: CartItem) => item.price * item.quantity)
        setSubtotal(prices)
        setTotalPrice(prices.reduce((a: any, b: any) => a + b, 0))
        return data
      }
    }

    setIsLoading(true)

    const latestCartItems = await fetchCartItems_local()

    if (latestCartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before placing an order.")
      return
    }

    const products = latestCartItems.map((item: CartItem) => ({
      plant_id: user ? item.plant_id : item.id,
      quantity: user ? item.quantity : findQuantity(item.id),
      price: item.price,
    }))

    const fullPhone = phone.startsWith("0") ? `+${countryPhoneCode}${phone.slice(1)}` : `+${countryPhoneCode}${phone}`
    const latestTotal = products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)

    const response = await fetch("https://urban-jungle-production.up.railway.app/api/place_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'user_id': user ? user.id : null,
        'first_name': firstname,
        'last_name': lastname,
        'country': country,
        'street_address': streetAddress,
        'postal_code': postcode,
        'city': townCity,
        'phone': fullPhone,
        'email': email,
        'additional_information': orderNotes,
        'cart_items': products,
        'total_amount': latestTotal,
      }),
    })
    if (response.ok) {
      alert("Order placed successfully!")
      try {
        if (user === null) {
          clearCart()
          createCart()
        }
        else {
          await fetch("https://urban-jungle-production.up.railway.app/api/shopping_cart/clearCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          })
        }
        increment()
      } catch (error) {
        console.error("Error clearing cart:", error) 
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
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
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
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
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Country / Region <span className="text-red-500">*</span>
                  </div>
                  <CountrySelect
                    className="h-10 font-navbar text-[rgb(71,85,105)] py-2 pl-[12.8px] pr-8 w-full"
                    onChange={(country: any) => {
                      setCountry(country.name)
                      setCountryPhoneCode(country.phone_code)
                    }}
                    value={country}
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
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
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
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
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
                    value={townCity}
                    onChange={(e) => setTownCity(e.target.value)}
                  />
                </div>
                <div className="mb-1.5">
                  <div className="font-navbar text-[14.4px] leading-[28.8px] font-bold">
                    Phone <span className="text-red-500">*</span>
                  </div>
                  <div className="flex items-center">
                    {countryPhoneCode && (
                      <div>
                        <span className="font-navbar text-[rgb(71,85,105)] py-3 px-4 mr-2">
                          +{countryPhoneCode}
                        </span>
                      </div>
                    )}
                    <input 
                      type="tel" 
                      placeholder="Phone" 
                      className="border h-10 font-navbar text-[rgb(71,85,105)] py-3 px-4 w-full"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 mb-5 md:mb-0">
          <div className="w-full border-2 relative">
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
              <Button 
                className="mt-6 mb-4 bg-[rgb(136,173,53)] rounded-3xl cursor-pointer text-white font-navbar text-[14.592px] leading-[19.6992px] h-[46px] w-full px-[30px] py-[15px] hover:bg-[rgb(105,137,39)] transition-colors duration-200"
                disabled={isLoading}
                onClick={handlePlaceOrder} 
              >
                Place order
              </Button>
            </div>
            {
              isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-50">
                  <div role="status">
                    <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
