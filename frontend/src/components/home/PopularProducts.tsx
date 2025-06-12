"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export default function PopularProducts() {
    const [popularPlants, setPopularPlants] = useState<Plant[]>([])
    const [displayList, setDisplayList] = useState<Plant[]>([])
    const [maxPage, setMaxPage] = useState(0)
    const [offSet, setOffSet] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [displayCart, setDisplayCart] = useState<number | null>(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setPopularPlants(data)
            setMaxPage(Math.ceil(data.length / offSet))
            setDisplayList(data.slice(0, offSet))
        })
        .catch((error) => {
            console.error("Error fetching popular plants:", error)
        })
    }, [])

    useEffect(() => {
        const startIndex = currentPage * offSet
        const endIndex = startIndex + offSet
        setDisplayList(popularPlants.slice(startIndex, endIndex))
    }, [currentPage, popularPlants, offSet])
    
    return (
        <div className="w-full px-6 md:px-8 lg:px-10">
            <div className="w-full pt-16 pb-5 md:py-20 flex flex-col items-center gap-y-[45px] md:gap-y-[60px]">
                <h2 className="text-center text-[32.832px] lg:text-[42px] font-medium text-[rgb(34,34,34)]">Popular Products</h2>
                <ul className="max-w-[1200px] grid grid-cols-2 md:grid-cols-3 relative">
                    {displayList.map((plant, id) => (
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
                    {
                        displayList.length !== 0 && (
                            <>
                                <div
                                    className="absolute size-8 border rounded-full bg-[rgb(136,173,53)] hover:bg-[#698927] top-1/2 left-0 flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                    if (currentPage > 0) {
                                        setCurrentPage(currentPage - 1)
                                    }
                                    else if (currentPage === 0) {
                                        setCurrentPage(maxPage - 1)
                                    }
                                    }}
                                >
                                    <FaAngleLeft className="text-white" />
                                </div>
                                <div 
                                    className="absolute size-8 border rounded-full bg-[rgb(136,173,53)] hover:bg-[#698927] top-1/2 right-0 flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        if (currentPage < maxPage - 1) {
                                            setCurrentPage(currentPage + 1)
                                        } else if (currentPage === maxPage - 1) {
                                            setCurrentPage(0)
                                        }
                                    }}
                                >
                                    <FaAngleRight className="text-white" />
                                </div>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
  )
}
