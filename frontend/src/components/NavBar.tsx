"use client"

import { FaFacebook, FaInstagram, FaYoutube, FaShoppingBag } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { RxHamburgerMenu } from "react-icons/rx"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import useMobileMenu from "@/stores/useMobileMenu"
import useShoppingCart from "@/stores/useShoppingCart"
import Link from 'next/link'
import ShoppingCart from "./ShoppingCart"
import Profile from "./login/Profile"
import useLogOut from "@/stores/useLogOut"

export const NavBar = () => {
    const { showMobileMenu, setShowMobileMenu } = useMobileMenu()
    const { setShowLogOut } = useLogOut()
    const [showMainMenu, setShowMainMenu] = useState(false)
    const { setShowShoppingCart } = useShoppingCart()
    const path = usePathname()

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
                <div 
                    className="h-full flex items-center"
                    onClick={() => {
                        setShowMobileMenu(false)
                        setShowLogOut(false)
                    }}
                >
                    <Link className="pr-4 cursor-pointer"
                        href="/"
                    >
                        <img 
                            className="w-[150px] md:w-[200px] h-[41px]" src={`${showMainMenu ? 
                                "https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/header-logo.svg" : 
                                "https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/normal-header.svg"
                            }`} 
                            alt="" 
                        />
                    </Link>
                </div>
                <div className="hidden md:flex items-center h-full ml-auto lg:translate-x-[-32px]">
                    <div 
                        className="pr-2.5"
                        onClick={() => {
                            setShowLogOut(false)
                        }}
                    >
                        <ul className="flex font-navbar">
                            <Link
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                href="/"
                            >
                                Home
                            </Link>
                            <Link 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/shop" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                href={"/shop"}
                            >
                                Shop
                            </Link>
                            <Link 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/about" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                href={"/about"}
                            >
                                About
                            </Link>
                            <Link 
                                className={`cursor-pointer ${showMainMenu ? "text-white" : ""} px-4 text-[16px] ${path === "/contact" ? "text-[#698927]" : ""} hover:text-[#698927]`}
                                href={"/contact"}
                            >
                                Contact
                            </Link>
                        </ul>
                    </div>
                    <div 
                        className="hidden px-2.5 lg:flex items-center h-6"
                        onClick={() => {
                            setShowLogOut(false)
                        }}
                    >
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
                        className="cursor-pointer"
                        onClick={() => {
                            setShowLogOut(false)
                        }}
                    >
                        <ShoppingCart showMainMenu={showMainMenu} />
                    </div>
                    <Profile showMainMenu={showMainMenu} />
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
                        <Link 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            href={"/"}
                            onClick={() => {
                                setShowMobileMenu(false)
                            }}
                        >
                            Home
                        </Link>
                        <Link 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/shop" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            href={"/shop"}
                            onClick={() => {
                                setShowMobileMenu(false)
                            }}
                        >
                            Shop
                        </Link>
                        <Link 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "/about" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            href={"/about"}
                            onClick={() => {
                                setShowMobileMenu(false)
                            }}
                        >
                            About
                        </Link>
                        <Link 
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "contact" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            href={"/contact"}
                            onClick={() => {
                                setShowMobileMenu(false)
                            }}
                        >
                            Contact
                        </Link>
                        <Link
                            className={`flex items-center font-navbar cursor-pointer text-[14.6px] ${path === "contact" ? "text-[rgb(105,137,39)]" : ""} hover:text-[rgb(105,137,39)] px-6 sm:px-8`}
                            href={"/cart"}
                            onClick={() => {
                                setShowMobileMenu(false)
                            }}
                        >
                            Cart
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    )
}