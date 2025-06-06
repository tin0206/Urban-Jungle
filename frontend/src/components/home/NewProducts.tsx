"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"

export default function NewProducts() {
    const [newPlants, setNewPlants] = useState<Plant[]>([])
    const [displayCart, setDisplayCart] = useState<number | null>(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setNewPlants(data)
        })
        .catch((error) => {
            console.error("Error fetching new plants:", error)
        })
    }, [])

    return (
    <div className="w-full px-2 md:px-8 lg:px-10">
        <div className="pt-[64px] pb-[20px] md:pt-[80px] md:pb-[40px] lg:pt-[100px] lg:pb-[60px] flex flex-col items-center">
            <h1 className="text-center font-medium text-[32.832px] lg:text-[42px] text-[rgb(34,34,34)]">New Products</h1>
            <ul className="max-w-[1200px] grid grid-cols-2 md:grid-cols-3 mt-10">
                {newPlants.map((plant, id) => (
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
