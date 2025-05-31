import { MdPayment } from "react-icons/md";
import { FaTruck, FaBoxOpen, FaRegHeart } from "react-icons/fa";

export default function ValueSection() {
  return (
    <div className="flex justify-center px-6 md:px-8 lg:px-10">
        <div className="pt-[60px]">
            <ul className="flex md:flex-row flex-col md:gap-5 lg:gap-20 xl:gap-30 border-b-[0.5px] border-b-gray-300">
                <li className="w-[187.5px] pb-10 flex flex-col items-center justify-center text-center">
                    <div className="flex justify-center items-center size-[60px] border-[1px] rounded-full border-transparent bg-[rgb(236,244,211)] mb-3.5">
                        <MdPayment className="text-[32px]" />
                    </div>
                    <div>
                        <h1>Secure Payment</h1>
                        <h2 className="font-navbar">Safe & Secure Checkout</h2>
                    </div>
                </li>
                <li className="w-[187.5px] pb-10 flex flex-col items-center justify-center text-center">
                    <div className="flex justify-center items-center size-[60px] border-[1px] rounded-full border-transparent bg-[rgb(236,244,211)] mb-3.5">
                        <FaTruck className="text-[32px]" />
                    </div>
                    <div>
                        <h1>Free Shipping</h1>
                        <h2 className="font-navbar">For $50 order</h2>
                    </div>
                </li>
                <li className="w-[187.5px] pb-10 flex flex-col items-center justify-center text-center">
                    <div className="flex justify-center items-center size-[60px] border-[1px] rounded-full border-transparent bg-[rgb(236,244,211)] mb-3.5">
                        <FaBoxOpen className="text-[32px]" />
                    </div>
                    <div>
                        <h1>Delivered with Care</h1>
                        <h2 className="nav-bar">Handled with care</h2>
                    </div>
                </li>
                <li className="w-[187.5px] pb-10 flex flex-col items-center justify-center text-center">
                    <div className="flex justify-center items-center size-[60px] border-[1px] rounded-full border-transparent bg-[rgb(236,244,211)] mb-3.5">
                        <FaRegHeart className="text-[32px]" />
                    </div>
                    <div>
                        <h1>Excellent Service</h1>
                        <h2 className="nav-bar">24/7 Support</h2>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
