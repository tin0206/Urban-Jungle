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
                pathname === "/about" ? "bg-[url(/about_background.jpg)] h-[333.828px] sm:h-[351.328px] md:h-[421.328px] lg:h-[567.594px]" : 
                pathname === "/contact" ? "bg-[url(/contact_background.jpg)] h-[287.859px] sm:h-[296.609px] md:h-[366.609px] lg:h-[490.797px]" : ""
            } w-full bg-cover`}
        >
            {children}
        </div>
    )
}