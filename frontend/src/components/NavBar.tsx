"use client"

import { FaFacebook, FaInstagram, FaYoutube, FaShoppingBag } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { RxHamburgerMenu } from "react-icons/rx"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import useMobileMenu from "@/stores/useMobileMenu"
import useShoppingCart from "@/stores/useShoppingCart"

export const NavBar = () => {
    const { showMobileMenu, setShowMobileMenu } = useMobileMenu()
    const [showMainMenu, setShowMainMenu] = useState(false)
    const { setShowShoppingCart } = useShoppingCart()
    const path = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (path === "/" || path === "/about" || path === "/contact") {
            setShowMainMenu(true)
        }
        else {
            setShowMainMenu(false)
        }
    }, [path])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowMobileMenu(false)
            }
            else {
                setShowShoppingCart(false)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="w-full h-[70px] md:h-20">
            <div className="px-5 flex items-center md:justify-center justify-between h-full 2xl:mx-[332.500px]">
                <div className="h-full flex items-center">
                    <div className="pr-4 cursor-pointer"
                        onClick={() => {
                            router.push("/")
                        }}
                    >
                        <img 
                            className="w-[120px] md:w-[200px] h-[41px]" src={`${showMainMenu ? 
                                "https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/header-logo.svg" : 
                                "https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/normal-header.svg"
                            }`} 
                            alt="" 
                        />
                    </div>
                </div>
                <div className="hidden md:flex items-center h-full ml-auto lg:translate-x-[-32px]">
                    <div className="pr-2.5">
                        <ul className="flex font-navbar">
                            <li 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                onClick={() => router.push("/")}
                            >
                                Home
                            </li>
                            <li 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/shop" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                onClick={() => router.push("/shop")}
                            >
                                Shop
                            </li>
                            <li 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/about" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                onClick={() => router.push("/about")}
                            >
                                About
                            </li>
                            <li 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/contact" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                onClick={() => router.push("/contact")}
                            >
                                Contact
                            </li>
                        </ul>
                    </div>
                    <div className="px-2.5 flex items-center h-6">
                        <ul className="flex">
                            <li className="cursor-pointer mr-2.5">
                                <FaFacebook className={`${showMainMenu ? "text-white" : ""} size-4 hover:text-[#698927]`} />
                            </li>
                            <li className="cursor-pointer mx-2.5">
                                <FaInstagram className={`${showMainMenu ? "text-white" : ""} size-4 hover:text-[#698927]`} />
                            </li>
                            <li className="cursor-pointer mx-2.5">
                                <FaYoutube className={`${showMainMenu ? "text-white" : ""} size-4 hover:text-[#698927]`} />
                            </li>
                            <li className="cursor-pointer ml-2.5">
                                <FaXTwitter className={`${showMainMenu ? "text-white" : ""} size-4 hover:text-[#698927]`} />
                            </li>
                        </ul>
                    </div>
                    <div 
                        className="cursor-pointer flex items-center pl-2.5"
                        onClick={() => {
                            setShowShoppingCart(true)
                        }}
                    >
                        <FaShoppingBag className={`${showMainMenu ? "text-white" : "text-[rgb(136,173,53)]"} size-5`} />
                    </div>
                </div>
                <div className="flex md:hidden">
                    <Button
                        variant="ghost"
                        className="flex size-[42px] bg-transparent border-2 border-[rgb(136,173,53)] hover:bg-transparent cursor-pointer rounded-none"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? (
                            <div>
                                <div className="text-[rgb(136,173,53)] size-6 text-xl">X</div>
                            </div>
                        ) : (
                            <RxHamburgerMenu className="text-[rgb(136,173,53)] size-6" />
                        )}
                    </Button>
                </div>
            </div>
            {showMobileMenu && (
                <div className="md:hidden w-full bg-white h-[175.125px] relative z-10">
                    <ul className="h-full grid grid-rows-4">
                        <li 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            onClick={() => {
                                setShowMobileMenu(false)
                                router.push("/")
                            }}
                        >
                            Home
                        </li>
                        <li 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/shop" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            onClick={() => {
                                setShowMobileMenu(false)
                                router.push("/shop")
                            }}
                        >
                            Shop
                        </li>
                        <li 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/about" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            onClick={() => {
                                setShowMobileMenu(false)
                                router.push("/about")
                            }}
                        >
                            About
                        </li>
                        <li 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "contact" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            onClick={() => {
                                setShowMobileMenu(false)
                                router.push("/contact")
                            }}
                        >
                            Contact
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}