"use client"

import { Button } from "./ui/button"
import Link from "next/link"

export default function ReadyToFind() {

  return (
    <div className="w-full px-6 md:px-8 lg:px-10 bg-[url('/ready_to_find.jpg')] bg-cover bg-center">
      <div className="w-full flex flex-col items-center py-16 md:py-20 lg:py-[100px] gap-y-5 text-white">
        <h2 className="text-center font-medium text-[33px] md:text-[42px]">
            Ready to Find your Perfect Plant?
        </h2>
        <div className="w-10/12">
            <p className="md:px-[173.750px] font-navbar text-[14.6px] md:text-[16px] text-center">
            	Browse our online store or visit us in person to experience the beauty of nature.
            </p>
        </div>
        <div className="h-[56px] flex items-end">
          <Link href="/shop">
            <Button 
              className="font-navbar rounded-3xl w-[135px] h-[46px] text-[16px] cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300"
            >
            	Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
