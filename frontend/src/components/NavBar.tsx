import { FaFacebook, FaInstagram, FaYoutube, FaShoppingBag } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { RxHamburgerMenu } from "react-icons/rx"
import { Button } from "./ui/button"

export const NavBar = () => {
    return (
        <div className="w-full h-[70px] md:h-20">
            <div className="px-5 flex items-center md:justify-center justify-between h-full 2xl:mx-[332.500px]">
                <div className="h-full flex items-center">
                    <div className="pr-4 cursor-pointer">
                        <img className="w-[120px] md:w-[200px] h-[41px]" src="https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/header-logo.svg" alt="" />
                    </div>
                </div>
                <div className="hidden md:flex items-center h-full ml-auto lg:translate-x-[-32px]">
                    <div className="pr-2.5">
                        <ul className="flex font-navbar">
                            <li className="cursor-pointer text-white px-4 text-[16px] hover:text-[#ecf4d3]">
                                Home
                            </li>
                            <li className="cursor-pointer text-white px-4 text-[16px] hover:text-[#ecf4d3]">
                                Shop
                            </li>
                            <li className="cursor-pointer text-white px-4 text-[16px] hover:text-[#ecf4d3]">
                                About
                            </li>
                            <li className="cursor-pointer text-white px-4 text-[16px] hover:text-[#ecf4d3]">
                                Contact
                            </li>
                        </ul>
                    </div>
                    <div className="px-2.5 flex items-center h-6">
                        <ul className="flex">
                            <li className="cursor-pointer mr-2.5">
                                <FaFacebook className="text-white size-4 hover:text-[#698927]" />
                            </li>
                            <li className="cursor-pointer mx-2.5">
                                <FaInstagram className="text-white size-4 hover:text-[#698927]" />
                            </li>
                            <li className="cursor-pointer mx-2.5">
                                <FaYoutube className="text-white size-4 hover:text-[#698927]" />
                            </li>
                            <li className="cursor-pointer ml-2.5">
                                <FaXTwitter className="text-white size-4 hover:text-[#698927]" />
                            </li>
                        </ul>
                    </div>
                    <div className="cursor-pointer flex items-center pl-2.5">
                        <FaShoppingBag className="text-white size-5" />
                    </div>
                </div>
                <div className="flex md:hidden">
                    <Button
                        variant="ghost"
                        className="size-[42px] bg-transparent border-2 border-[rgb(136,173,53)] hover:bg-[#d5d8d0] cursor-pointer rounded-none"
                    >
                        <RxHamburgerMenu className="text-[rgb(136,173,53)] size-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}