"use client"

import { CartItem } from "@/app/model"
import { useCartStore } from "@/stores/useCartStore"
import { useEffect, useState } from "react"
import { LuShoppingCart } from "react-icons/lu"
import { Button } from "../ui/button"
import Link from "next/link"

export default function CartDisplay() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [quantity, setQuantity] = useState<number[]>([])
    const [total, setTotal] = useState(0)
    const [subtotal, setSubtotal] = useState<number[]>([])
    const { click, increment } = useCartStore()

    useEffect(() => {
        const fetchCartItems = async () => {
            await fetch("http://localhost:8000/api/shopping_cart/items", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setCartItems(data)
                setQuantity(data.map((item: CartItem) => item.quantity))
            })
            .catch((error) => {
                console.error("Error fetching cart items:", error)
            })
        }

        fetchCartItems()
    }, [click])

    useEffect(() => {
        const subTotal = cartItems.map((item, index) => item.price * quantity[index])
        setSubtotal(subTotal)  
        const totalAmount = subTotal.reduce((acc, curr) => acc + curr, 0)
        setTotal(totalAmount)
    }, [cartItems, quantity])

    return (
        <div className="w-full">
            <h1 className="mt-2 xl:mt-0 mb-[17.51px] md:mb-[19.2px] text-[rgb(34,34,34)] text-[29.184px] md:text-[32px] leading-[35.0208px] md:leading-[38.4px] font-semibold">
                Cart
            </h1>
            <div className="w-full">
                {
                    cartItems.length === 0 ? (
                        <div className="w-full bg-[rgb(247,246,247)] border-t-[3px] border-t-[rgb(136,173,53)] py-[14.592px] md:py-4 px-[29.184px] md:px-8 mb-[29.184px] md:mb-8">
                            <div className="flex items-center gap-4">
                                <LuShoppingCart className="size-[20px] text-[rgb(136,173,53)]" />
                                <div className="font-navbar text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(81,81,81)]">
                                    Your cart is currently empty.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <table className="w-full border">
                                <thead>
                                    <tr className="h-[46.375px] text-center">
                                        <th className="w-[50px]"></th>
                                        <th className="w-[140px]"></th>
                                        <th className="w-[207px] text-left px-4 py-[11.2px]">
                                            Product
                                        </th>
                                        <th className="w-[140px] text-left px-4 py-[11.2px] hidden md:flex">
                                            Price
                                        </th>
                                        <th className="w-[207px] text-left px-4 py-[11.2px]">
                                            Quantity
                                        </th>
                                        <th className="w-[140px] text-left px-4 py-[11.2px]">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index} className="h-[99.3125px] border text-center">
                                            <td className="w-[50px]">
                                                <Button
                                                    variant={"ghost"}
                                                    className="size-5 rounded-full border-2 cursor-pointer p-[10px] text-gray-400 bg-white hover:text-black hover:border-black"
                                                    onClick={() => {

                                                    }}
                                                >
                                                    x
                                                </Button>
                                            </td>
                                            <td className="w-[140px] px-4 py-[11.2px]">
                                                <Link href={`/product/${item.plant_name.replace(/\s+/g, '-').toLowerCase()}`}>
                                                    <img src="/default.jpg" alt="" className="size-[40px] sm:size-[58px] md:size-[64px] cursor-pointer" />
                                                </Link>
                                            </td>
                                            <td className="text-left px-4 py-[11.2px]">
                                                <Link href={`/product/${item.plant_name.replace(/\s+/g, '-').toLowerCase()}`}>
                                                    <h3 className="text-[16px] font-navbar font-medium text-[rgb(136,173,53))] leading-[24px] cursor-pointer transition-colors duration-[0.2s] hover:text-[rgb(105,137,39)]">
                                                        {item.plant_name}
                                                    </h3>
                                                </Link>
                                                <div className="flex md:hidden text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px]">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell w-[140px] text-left px-4 py-[11.2px]">
                                                <div className="flex text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px]">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="text-left px-4 py-[11.2px]">
                                            <input 
                                                    type="number" 
                                                    defaultValue={quantity[index]} 
                                                    min={1} max={50} 
                                                    className="border p-[4.8px] w-[58.0938px] h-[40px] text-[16px] font-navbar text-[rgb(71,85,105)]"
                                                    onChange={(e) => {
                                                        if (parseInt(e.target.value) > 50) {
                                                            e.target.value = "50"
                                                        }

                                                        if (parseInt(e.target.value) < 1) {
                                                            e.target.value = "1"
                                                        }

                                                        if (isNaN(parseInt(e.target.value))) {
                                                            e.target.value = "1"
                                                            return
                                                        }
                                                        const newQuantity = [...quantity]
                                                        newQuantity[index] = parseInt(e.target.value)
                                                        setQuantity(newQuantity)
                                                    }}
                                                />
                                            </td>
                                            <td className="w-[140px] text-left px-4 py-[11.2px]">
                                                <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px]">
                                                    ${(subtotal[index] ?? 0).toFixed(2)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="h-[69.375px]">
                                        <td colSpan={3} className="px-4 py-[11.2px]">
                                            <input type="text" placeholder="Coupon code" className="h-[35px] py-2 px-3 border mb-1 mr-2" />
                                            <Button 
                                                className="py-[14px] px-7 rounded-3xl h-[46px] bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                                            >
                                                <span className="font-navbar text-[16px] font-medium text-white">Apply coupon</span>
                                            </Button>
                                        </td>
                                        <td colSpan={3} className="text-right pl-4 py-[11.2px] pr-4 lg:pr-16">
                                            <Button 
                                                className="py-[14px] px-7 rounded-3xl h-[46px] bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                                            >
                                                <span className="font-navbar text-[16px] font-medium text-white">Update cart</span>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>
            <div className="w-full mt-8 mb-8">
                {
                    cartItems.length === 0 ? (
                        <Link href={'/shop'}>
                            <Button 
                                className="py-[14px] px-7 rounded-3xl h-[46px] bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                            >
                                <span className="font-navbar text-[16px] font-medium text-white">Return to shop</span>
                            </Button>
                        </Link>
                    ) : (
                        <div className="w-full flex justify-center md:justify-end">
                            <div className="w-6/12 h-[349.406px] max-w-[450px] border">
                                <div className="w-full flex items-center border-b border-b-[rgb(209,209,209)] mb-5">
                                    <h2 className="px-[42px] py-[29.4px] h-[110.18px] font-medium leading-[39.3984px] md:leading-[50.4px] text-[32.832px] md:text-[42px] text-[rgb(34,34,34)] flex items-center">
                                        Cart totals
                                    </h2>
                                </div>
                                <div className="px-5">
                                    <div className="flex items-center">
                                        <div>
                                            Items
                                        </div>
                                        <div>
                                            {cartItems.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
