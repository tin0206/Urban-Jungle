"use client"

import { usePathname } from "next/navigation"

export function ClientLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    
    return (
        <div
            className={`font-main ${
                pathname === "/" ? "bg-[url(/background.jpg)]" : ""
            } w-full h-[600px] lg:h-[912px] transition-transform bg-cover`}
        >
            {children}
        </div>
    )
}