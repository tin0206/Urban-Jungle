"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function FlashSale() {
    const router = useRouter()
    const [hoverShopNow, setHoverShopNow] = useState(false)

    return (
        <div className="w-full h-[334px] sm:h-[323px] md:h-[385px] lg:h-[448px]">
            <div className="w-full h-full bg-[url('/sale_background.jpg')] bg-cover bg-center text-white">
                <div className="py-[50px] md:py-[80px] flex items-center justify-center flex-col text-center gap-y-5">
                    <h1 className="text-[31px] md:text-[33px] lg:text-[42px] font-medium w-[437px] sm:w-[578px] md:w-[550px]">
                        Flash Sale: Up to 50% Off on Select Items!
                    </h1>
                    <p className="font-navbar text-[14.5px] w-[437px] sm:w-[578px] md:w-[550px]">
                        Don't miss out on our flash sale event! For a limited time, enjoy up to 50% off on a selection of our best-selling products.
                    </p>
                    <div className="h-[49px] mt-2">
                        <Button 
                            variant="ghost"
                            className={`w-[137px] h-[48px] px-6 py-3 rounded-3xl transition-colors duration-200 cursor-pointer
                                ${hoverShopNow ? "bg-white text-black" : "bg-transparent border-1"}`}
                            onMouseOver={() => setHoverShopNow(true)}
                            onMouseOut={() => setHoverShopNow(false)}
                            onClick={() => router.push("/shop")}
                        >
                            <span className="font-navbar text-[16px] font-medium">
                                Shop Now
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
