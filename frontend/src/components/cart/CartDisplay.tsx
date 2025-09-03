"use client"

import { CartItem, TempDeleteCartItem } from "@/app/model"
import { useCartStore } from "@/stores/useCartStore"
import { useEffect, useState } from "react"
import { LuShoppingCart } from "react-icons/lu"
import { Button } from "../ui/button"
import Link from "next/link"
import { TiTick } from "react-icons/ti"
import useUserStore from "@/stores/useUserStore"
import useLocalStorageCart from "@/stores/useLocalStorageCart"

export default function CartDisplay() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [quantity, setQuantity] = useState<number[]>([])
    const [quantityChange, setQuantityChange] = useState(false)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [total, setTotal] = useState(0)
    const [subtotal, setSubtotal] = useState<number[]>([])
    const { click, increment } = useCartStore()
    const [isLoading, setIsLoading] = useState(false)
    const [tempDeleteItem, setTempDeleteItem] = useState<TempDeleteCartItem | null>(null)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const { user } = useUserStore()
    const { cart, addItem, updateItems, deleteItems, removeItem } = useLocalStorageCart()
    const [tempRemoveId, setTempRemoveId] = useState<number | null>(null)
    const [tempRemoveQuantity, setTempRemoveQuantity] = useState<number | null>(null)

    const findQuantity = (id: number) => {
        const quantity = cart.find((item: CartItem) => item.id === id)?.quantity
        return quantity
    }

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user === null || user.role != "admin") {
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
                        deleteItems(data.removed_plants)
                    }
                    setQuantity(cart.map((item: CartItem) => findQuantity(item.id)!))
                    const totalMount = data.plants.reduce((acc: number, item: CartItem) => {
                        const quantity = cart.find((cartItem: CartItem) => cartItem.id === item.id)?.quantity
                        return acc + (item.price * (quantity || 0))
                    }, 0)
                    setTotal(totalMount)
                    const totalItems = data.plants.reduce((acc: number, item: CartItem) => acc + (findQuantity(item.id)!), 0)
                    setNumberOfItems(totalItems)
                })
            }
            else if (user.role !== "admin") {
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
                    setQuantity(data.map((item: CartItem) => item.quantity))
                    const totalItems = data.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
                    setNumberOfItems(totalItems)
                    setTotal(data.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0))
                })
                .catch((error) => {
                    console.error("Error fetching cart items:", error)
                })
            }
        }

        fetchCartItems()
    }, [click, user])

    useEffect(() => {
        const subTotal = cartItems.map((item, index) => item.price * quantity[index])
        setSubtotal(subTotal)
    }, [cartItems, quantity, click])

    async function handleRemoveItem(itemId: number) {
        setIsLoading(true)
        const itemToRemove = cartItems.find(item => item.id === itemId)
        if (itemToRemove) {
            setTempDeleteItem({
                plant_id: itemToRemove.plant_id,
                plant_name: itemToRemove.plant_name,
                quantity: itemToRemove.quantity
            })
        }
        
        if (user === null) {
            const itemToRemove = cart.find(item => item.id === itemId)
            if (itemToRemove) {
                setTempRemoveId(itemToRemove.id)
                setTempRemoveQuantity(itemToRemove.quantity)
            }
            removeItem(itemId)
            setDeleteSuccess(true)
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
                .then((response) => {
                    if (!response.ok) {
                        setTempDeleteItem(null)
                    }
                    else {
                        setDeleteSuccess(true)
                    }
                })
            } catch (error) {
                console.error("Error removing item from cart:", error) 
            }
        }

        setTimeout(() => {
            setIsLoading(false)
            increment()
        }, 1000)
    }

    async function updateCart() {
        setIsLoading(true)
        try {
            const itemsChangeList = cartItems.map((item: CartItem, index) => {
                if (item.quantity !== quantity[index]) {
                    return {
                        id: item.id,
                        quantity: quantity[index]
                    }
                }
                return null
            })

            if (itemsChangeList.length > 0) {
                if (user === null || user.role != "admin") {
                    updateItems(itemsChangeList.filter(item => item !== null) as CartItem[])
                    increment()
                }
                else {
                    await fetch("http://localhost:8000/api/shopping_cart/updateCart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                        },
                        body: JSON.stringify({ items: itemsChangeList.filter(item => item !== null) }),
                    })
                    increment()
                }
            }
        } catch (error) {
            console.error("Error updating cart:", error)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    async function undoDelete() {
        setIsLoading(true)
        if (tempDeleteItem) {
            if (user === null) {
                let item : any = {
                    id: tempRemoveId,
                    quantity: tempRemoveQuantity,
                }
                addItem(item as CartItem)
                setTimeout(() => {
                    setDeleteSuccess(false)
                    setTempDeleteItem(null)
                    increment()
                }, 1000)
            }
            else {
                try {
                    await fetch("http://localhost:8000/api/shopping_cart/addItem", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                        },
                        body: JSON.stringify({
                            plant_id: tempDeleteItem.plant_id,
                            quantity: tempDeleteItem.quantity,
                            user_id: user?.id
                        })
                    })
                    .then((response) => {
                        if (response.ok) {
                            setDeleteSuccess(false)
                            setTempDeleteItem(null)
                        }
                    })
                    increment()
                } catch (error) {
                    console.error("Error undoing delete:", error)
                }
            }

            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    return (
        <div className="w-full">
            <h1 className="mt-2 xl:mt-0 mb-[17.51px] md:mb-[19.2px] text-[rgb(34,34,34)] text-[29.184px] md:text-[32px] leading-[35.0208px] md:leading-[38.4px] font-semibold">
                Cart
            </h1>
            <div className="w-full">
                {
                    deleteSuccess && tempDeleteItem && !isLoading && (
                        <div className="w-full bg-[rgb(247,246,247)] border-t-[3px] border-t-[rgb(136,173,53)] py-[14.592px] md:py-4 px-[29.184px] md:px-8 mb-[29.184px] md:mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-[33px] h-[20px] pr-[8px]">
                                    <div className="w-[20px] h-full flex items-center justify-center border-foreground bg-[rgb(136,173,53)] rounded-full">
                                        <TiTick className="size-[20px] text-white" />
                                    </div>
                                </div>
                                <div className="pl-[5px] flex gap-x-1">
                                    <div className="font-navbar text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(69,69,69)]">
                                        "{tempDeleteItem?.plant_name}" removed. 
                                    </div>
                                    <div 
                                        className="font-navbar text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] text-[rgb(136,173,53)] hover:text-[rgb(105,137,39)] cursor-pointer hover:underline"
                                        onClick={undoDelete}
                                    >
                                        Undo?
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
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
                        <>
                            <div className="relative">
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
                                                        disabled={isLoading}
                                                        onClick={() => handleRemoveItem(item.id)}
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

                                                            if (parseInt(e.target.value) === item.quantity) {
                                                                setQuantityChange(false)
                                                                return
                                                            }

                                                            const newQuantity = [...quantity]
                                                            newQuantity[index] = parseInt(e.target.value)
                                                            setQuantity(newQuantity)
                                                            setQuantityChange(true)
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
                                                    disabled={isLoading || !quantityChange}
                                                    onClick={updateCart}
                                                >
                                                    <span className="font-navbar text-[16px] font-medium text-white">Update cart</span>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                { isLoading && (
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-50">
                                        <div role="status">
                                            <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>                        
                        </>
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
                            <div className="h-[349.406px] max-w-[800px] border relative">
                                <div className="w-full flex items-center border-b border-b-[rgb(209,209,209)] mb-5">
                                    <h2 className="px-[42px] py-[29.4px] h-[110.18px] font-medium leading-[39.3984px] md:leading-[50.4px] text-[32.832px] md:text-[42px] text-[rgb(34,34,34)] flex items-center">
                                        Cart totals
                                    </h2>
                                </div>
                                <div className="px-5 flex flex-col items-center">
                                    <div className="flex items-center px-4 py-[11.2px] border-b">
                                        <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px] font-medium w-[156.562px]">
                                            Items
                                        </div>
                                        <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px] font-medium w-[234.875px]">
                                            {numberOfItems}
                                        </div>
                                    </div>
                                    <div className="flex items-center px-4 py-[11.2px] border-b mb-5">
                                        <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px] font-medium w-[156.562px]">
                                            Total
                                        </div>
                                        <div className="text-[16px] font-navbar text-[rgb(69,69,69)] leading-[24px] font-medium w-[234.875px]">
                                            ${total.toFixed(2)}
                                        </div>
                                    </div>
                                    <Link href={"/checkout"}>
                                        <Button 
                                            className="mb-[17.6px] p-[17.6px] rounded-4xl h-[66.875px] w-10/12 bg-[rgb(136,173,53)] hover:bg-[#698927] cursor-pointer"
                                        >
                                            <span className="font-navbar text-[16px] font-medium text-white">Proceed to checkout</span>
                                        </Button>
                                    </Link>
                                </div>
                                { isLoading && (
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-50">
                                        <div role="status">
                                            <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
