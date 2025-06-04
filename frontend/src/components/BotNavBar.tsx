"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function BotNavBar() {
    const path = usePathname()

    return (
        <div className="w-full flex flex-col justify-center items-center px-6 md:px-8 lg:px-10 bg-[rgb(236,244,211)]">
            <div className="max-w-[1200px] flex flex-col pt-[60px] pb-6 gap-y-5">
                <div className="w-full items-center grid grid-cols-1 pb-6 border-b-2 md:grid-cols-4 md:gap-x-2.5 lg:gap-x-5 gap-y-[30px] md:gap-y-0">
                    <div className="col-span-1 flex justify-center md:justify-start">
                        <img src="https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/normal-header.svg" alt="" className="w-[195px] h-[40px]" />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-center items-center">
                        <ul className="flex mx-[24.75px] lg:mx-[88.75px] xl:mx-[143.750px] font-navbar text-[16px]">
                            <Link 
                                className={`mr-8 cursor-pointer hover:text-[rgb(105,137,39)] ${path === "/" ? "text-[rgb(105,137,39)]" : ""} `}
                                href="/"
                            >
                                Home
                            </Link>
                            <Link 
                                className={`mr-8 cursor-pointer hover:text-[rgb(105,137,39)] ${path === "/shop" ? "text-[rgb(105,137,39)]" : ""}`}
                                href="/shop"
                            >
                                Shop
                            </Link>
                            <Link 
                                className={`mr-8 cursor-pointer hover:text-[rgb(105,137,39)] ${path === "/about" ? "text-[rgb(105,137,39)]" : ""}`}
                                href="/about"
                            >
                                About
                            </Link>
                            <Link 
                                className={`cursor-pointer hover:text-[rgb(105,137,39)] ${path === "/contact" ? "text-[rgb(105,137,39)]" : ""}`}
                                href="/contact"
                            >
                                Contact
                            </Link>
                        </ul>
                    </div>
                    <div className="col-span-1 flex justify-center md:justify-end">
                        <ul className="flex text-[rgb(69,69,69)] font-navbar">
                            <li className="w-[30px] h-[20px] cursor-pointer mx-2">
                                <FaFacebook className="size-5 hover:text-[rgb(105,137,39)]" />
                            </li>
                            <li className="w-[30px] h-[20px] cursor-pointer mx-2">
                                <FaInstagram className="size-5 hover:text-[rgb(105,137,39)]" />
                            </li>
                            <li className="w-[30px] h-[20px] cursor-pointer mx-2">
                                <FaYoutube className="size-5 hover:text-[rgb(105,137,39)]" />
                            </li>
                            <li className="w-[30px] h-[20px] cursor-pointer mx-2">
                                <FaXTwitter className="size-5 hover:text-[rgb(105,137,39)]" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center font-navbar text-[rgb(69,69,69)] text-[16px] leading-[24px]">
                    Copyright © 2025 Generic eCommerce
                </div>
            </div>
        </div>
    )
}
