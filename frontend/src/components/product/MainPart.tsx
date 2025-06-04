"use client"

import { Plant } from "@/app/model"
import { Button } from "../ui/button"
import { useEffect, useRef, useState } from "react"
import { useCartStore } from "@/stores/useCartStore"

type MainPartProps = {
    product: Plant
}

export default function MainPart({ product }: MainPartProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [addingToCart, setAddingToCart] = useState(false)
    const [display, setDisplay] = useState<string | null>("description")
    const { increment } = useCartStore()
    const [scrollY, setScrollY] = useState<number>(0)

    async function handleAddToCart(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setAddingToCart(true)
        const value = inputRef.current?.value
        if (value) {
            try {
                await fetch("http://localhost:8000/api/shopping_cart/addItem", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        plant_id: product.id,
                        quantity: value
                    })
                })
                increment()
            } catch (error) {
                console.error("Error adding to cart:", error)
            }
            setTimeout(() => {
                setAddingToCart(false)
                inputRef.current!.value = "1"
            }, 1000)
        }
    }

    useEffect(() => {
        function handleScroll() {
        setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 md:gap-x-12">
                <div>
                    <img src="/default.jpg" alt="" className="aspect-12/13" />
                </div>
                <div className="py-2">
                    <div className="h-[22.078px] mb-[14.72px] flex gap-x-1 font-navbar text-[rgb(119,119,119)] text-[14.72px] leading-[22.08px]">
                        <div className="cursor-pointer hover:underline">
                            {product.category_name}
                        </div>
                        <div>
                            /
                        </div>
                        <div>
                            {product.name}
                        </div>
                    </div>
                    <div className="mb-4 cursor-pointer text-[rgb(136,173,53)] text-[16px] font-navbar transition-colors duration-[0.2s] hover:text-[rgb(105,137,39)]">
                        {product.category_name}
                    </div>
                    <div className="mb-2.5 text-[rgb(34,34,34)] text-[20px] leading-[24px] font-semibold">
                        {product.name}
                    </div>
                    <div className="mb-[4.8px] flex items-center gap-x-1 font-navbar text-[rgb(69,69,69)]">
                        <div className="text-[24px] leading-[36px] font-bold">
                            ${product.price.toFixed(2)}
                        </div>
                        {
                            product.price >= 50 && (
                                <div className="text-[16px] leading-[24px]">
                                    & Free Shipping
                                </div>
                            )
                        }
                    </div>
                    <div className="mb-4 text-[rgb(69,69,69)] font-navbar text-[16px] leading-[24px] space-y-7">
                        {product.description.split('\n\n').map((para, index) => (
                            <p key={index}>{para}</p>
                        ))}
                    </div>
                    <form className="flex gap-x-4 mb-4" onSubmit={handleAddToCart}>
                        <input ref={inputRef} type="number" defaultValue={1} min={1} max={50} className="border p-[4.8px] w-[58.0938px] h-[40px] text-[16px] font-navbar text-[rgb(71,85,105)]" />
                        <Button
                            disabled={addingToCart}
                            className="cursor-pointer bg-[rgb(136,173,53)] text-white hover:bg-[rgb(105,137,39)] transition-colors duration-200 w-[121.484px] h-[36px] py-2.5 px-5 font-navbar text-[16px] leading-[24px] rounded-3xl"
                        >
                            Add to Cart
                        </Button>
                    </form>
                    <hr />
                    <div className="pt-[7.2px] mb-[11.52px] font-navbar text-[14.4px] leading-[21.6px]">
                        Category: <span className="cursor-pointer text-[rgb(136,173,53)] transition-colors duration-[0.2s] hover:text-[rgb(105,137,39)]">Indoor Plants</span>
                    </div>
                </div>
            </div>
            <div className="pt-[29.184px] md:pt-8 mb-[58.368px] md:mb-16 mt-4">
                <div className="w-full border-t mb-[14.592px] lg:mb-4">
                    <ul className="flex md:flex-row flex-col md:gap-x-3 gap-y-3">
                        <li 
                            className={`py-[7.296px] cursor-pointer text-[rgb(81,81,81)] font-navbar font-bold text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] ${
                                display === "description" ? "border-t-2 border-[rgb(136,173,53)]" : ""
                            }`}
                            onClick={() => setDisplay("description")}
                        >
                            Description
                        </li>
                        <li 
                            className={`py-[7.296px] cursor-pointer text-[rgb(81,81,81)] font-navbar font-bold text-[14.592px] md:text-[16px] leading-[21.888px] md:leading-[24px] ${
                                display === "reviews" ? "border-t-2 border-[rgb(136,173,53)]" : ""
                            }`}
                            onClick={() => setDisplay("reviews")}
                        >
                            Reviews
                        </li>
                    </ul>
                </div>
                <div className="w-full">
                    {display === "description" ? (
                        <div className="mb-4 text-[rgb(69,69,69)] font-navbar text-[16px] leading-[24px] space-y-7">
                            {product.description.split('\n\n').map((para, index) => (
                                <p key={index}>{para}</p>
                            ))}
                        </div>
                    ) : (
                        <div>
                            
                        </div>
                    )}
                </div>
            </div>
            {scrollY > 400 && (
                <div className="fixed top-0 left-0 h-[69.984px] w-screen bg-white flex flex-col items-center z-50">
                    <div className="max-w-[1200px] px-5 flex justify-between sm:gap-x-[112px] md:gap-x-[190px] lg:gap-x-[450px] xl:gap-x-[610px] items-center h-full">
                        <div className="h-full items-center hidden sm:flex">
                            <img src="/default.jpg" className="w-[46.078px] h-[49.984px] hidden md:flex" alt="" />
                            <div className="h-[37px] py-[5px] px-5 font-navbar text-[18px] text-[rgb(69,69,69)] leading-[27px]">
                                {product.name}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="pr-5 font-navbar text-[16px] text-[rgb(69,69,69)] font-bold leading-[24px]">
                                ${product.price.toFixed(2)}
                            </div>
                            <form className="flex items-center gap-x-4" onSubmit={handleAddToCart}>
                                <input ref={inputRef} type="number" defaultValue={1} min={1} max={50} className="border p-[4.8px] w-[58.0938px] h-[40px] text-[16px] font-navbar text-[rgb(71,85,105)]" />
                                <Button
                                    disabled={addingToCart}
                                    className="cursor-pointer bg-[rgb(136,173,53)] text-white hover:bg-[rgb(105,137,39)] transition-colors duration-200 w-[121.484px] h-[36px] py-2.5 px-5 font-navbar text-[16px] leading-[24px] rounded-3xl"
                                >
                                    Add to Cart
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
