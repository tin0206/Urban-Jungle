"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import { FaShoppingBag } from "react-icons/fa"

export default function TrendingProducts() {
    const [trendingPlants, setTrendingPlants] = useState<Plant[]>([])
    const [displayCart, setDisplayCart] = useState<number | null>(null)
    const [displayInstruction, setDisplayInstruction] = useState<number | null>(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setTrendingPlants(data)
            console.log("Trending plants fetched:", data)
        })
        .catch((error) => {
            console.error("Error fetching trending plants:", error)
        })
    }, [])

    return (
    <div className="w-full px-2 md:px-8 lg:px-10">
        <div className="pt-[64px] pb-[20px] md:pt-[80px] md:pb-[40px] lg:pt-[100px] lg:pb-[60px] flex flex-col items-center justify-center">
            <h1 className="text-center font-medium text-[42px]">Trending Products</h1>
            <ul className="max-w-[1200px] flex flex-wrap mt-12">
                {trendingPlants.map((plant, id) => (
                    <li key={id} className="w-1/2 md:w-1/3 mb-2 h-[298px] md:h-[338px] lg:h-[442px] xl:h-[534px] px-2.5">
                        <div
                            className={`relative cursor-pointer w-[226px] h-[226px] sm:w-[300px] sm:h-[250px] md:w-[225px] md:h-[233px] lg:w-[301px] lg:h-[327px] xl:w-[381px] xl:h-[414px]`}
                            onMouseOver={() => setDisplayCart(id)}
                            onMouseOut={() => setDisplayCart(null)}
                        >
                            <img
                                src="./default.jpg" alt=""
                                className="w-full h-full"
                            />
                            <div className={`flex items-center justify-center absolute top-4 right-4 border-2 border-transparent bg-white rounded-full size-7
                                ${displayCart === id ? "" : "hidden"}`}>
                                <FaShoppingBag 
                                    className={`size-4 text-gray-500
                                    ${displayInstruction === id ? "text-gray-800" : ""}`}
                                    onMouseOver ={() => setDisplayInstruction(id)}
                                    onMouseOut={() => setDisplayInstruction(null)}
                                />
                            </div>
                            <div className={`absolute flex items-center top-3 right-12
                                ${displayInstruction === id ? "" : "hidden"}`}>
                                <div className="text-white text-[10px] bg-black p-2 rounded-[5px]">Add to cart</div>
                                <div className="border-l-[5px] border-t-[5px] border-b-[5px] border-l-black"></div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-[16px] font-medium cursor-pointer">{plant.name}</h2>
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
