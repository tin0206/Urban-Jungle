"use client"

import useShoppingCart from "@/stores/useShoppingCart"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import ShoppingCartSidebar from "./ShoppingCartSidebar"
import { useLoginModal } from "@/stores/useLoginModal"
import LoginModal from "./LoginModal"

export function ClientLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    const { showShoppingCart, setShowShoppingCart } = useShoppingCart()
    const { showLoginModal, setShowLoginModal } = useLoginModal()

    useEffect(() => {
        if (showShoppingCart) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [showShoppingCart])
    
    return (
        <div className={`h-full relative`}
            onClick={() => {
                if (showShoppingCart) {
                    setShowShoppingCart(false)
                }
            }}
        >
            <div
                className={`font-main ${
                    pathname === "/" ? "bg-[url(/background.jpg)] h-[600px] lg:h-[912px]" : 
                    pathname === "/shop" ? "h-[600px] lg:h-[912px]" : 
                    pathname === "/about" ? "bg-[url(/about_background.jpg)] h-[333.828px] sm:h-[351.328px] md:h-[421.328px] lg:h-[567.594px]" : 
                    pathname === "/contact" ? "bg-[url(/contact_background.jpg)] h-[287.859px] sm:h-[296.609px] md:h-[366.609px] lg:h-[490.797px]" : ""
                } w-full bg-cover`}
            >
                {children}
            </div>
            {
                showLoginModal && (
                    <LoginModal />
                )
            }
            <div
                className={`fixed top-0 left-0 w-full h-full z-50 flex transition-opacity duration-300 ${
                    showShoppingCart ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="w-8/12 h-full bg-black/40 transition-opacity duration-200 cursor-pointer"></div>
                <div
                    className={`w-4/12 h-full border-[1px] bg-white transform transition-transform duration-200 ease-in-out ${
                        showShoppingCart ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ShoppingCartSidebar />
                </div>
            </div>
        </div>
    )
}