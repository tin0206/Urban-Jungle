"use client"

import { usePathname } from "next/navigation"
import path from "path"

export function ClientLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    
    return (
        <div
            className={`font-main ${
                pathname === "/" ? "bg-[url(/background.jpg)] h-[600px] lg:h-[912px]" : 
                pathname === "/shop" ? "h-[600px] lg:h-[912px]" : 
                pathname === "/about" ? "bg-[url(/about_background.jpg)] h-[333.828px] sm:h-[351.328px] md:h-[421.328px] lg:h-[567.594px]" : ""
            } w-full bg-cover`}
        >
            {children}
        </div>
    )
}