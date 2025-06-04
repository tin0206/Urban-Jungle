"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"

export default function PopularProducts() {
    const [popularPlants, setPopularPlants] = useState<Plant[]>([])
    const [displayCart, setDisplayCart] = useState<number | null>(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setPopularPlants(data)
        })
        .catch((error) => {
            console.error("Error fetching popular plants:", error)
        })
    }, [])
    
    return (
        <div className="w-full px-6 md:px-8 lg:px-10">
            <div className="w-full pt-16 pb-5 md:py-20 flex flex-col items-center gap-y-[45px] md:gap-y-[60px]">
                <h2 className="text-center text-[32.832px] lg:text-[42px] font-medium text-[rgb(34,34,34)]">Popular Products</h2>
                <ul className="max-w-[1200px] grid grid-cols-2 md:grid-cols-3">
                    {popularPlants.map((plant, id) => (
                        <li 
                            key={id} className="mb-2 h-[298px] md:h-[338px] lg:h-[442px] xl:h-[534px] px-2.5"
                        >
                            <div
                                className={`relative cursor-pointer w-full h-[226px] sm:h-[250px] md:h-[233px] lg:h-[327px] xl:h-[414px]`}
                                onMouseOver={() => setDisplayCart(id)}
                                onMouseOut={() => setDisplayCart(null)}
                            >
                                <Link href={`/product/${plant.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <img src="/default.jpg" alt="" className="w-full h-full" />
                                </Link>
                                <AddToCart displayCart={displayCart} id={id} plantId={plant.id} />
                            </div>
                            <div className="mt-2">
                                <Link href={`/product/${plant.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <h2 className="text-[16px] font-medium cursor-pointer">{plant.name}</h2>
                                </Link>
                                <p className="text-[13.6px] font-navbar text-gray-400">{plant.category_name}</p>
                                <p className="text-[14.4px] font-navbar font-bold">${plant.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
  )
}
