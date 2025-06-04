"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"

export default function ProductList() {
    const [products, setProducts] = useState<Plant[]>([])
    const [displayCart, setDisplayCart] = useState<number | null>(null)
    
    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setProducts(data)
        })
        .catch((error) => {
            console.error("Error fetching products:", error)
        })
    }, [])

    return (
        <div className="w-full flex md:justify-center">
            <div className="max-w-[1200px] px-5">
                <div className="py-[21.888px] lg:py-0 lg:my-16 w-full">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-x-[200px] lg:gap-x-[400px] xl:gap-x-[600px]">
                        <div>
                            <p className="my-[14.6px] md:my-[16px] ml-2 font-navbar text-[rgb(69,69,69)] text-[14.6px] md:text-[16px]">
                                Showing all {products.length} results
                            </p>
                        </div>
                        <div className="flex sm:justify-end  mr-2.5">
                            <form method="get" className="mb-[29.184px] sm:mb-[36.48px] md:mb-10">
                                <select name="orderby" className="px-2 pb-2 pt-2.5 text-[rgb(69,69,69)]">
                                    <option value="menu_order" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Default sorting</option>
                                    <option value="popularity" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by popularity</option>
                                    <option value="rating" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by average rating</option>
                                    <option value="date" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by latest</option>
                                    <option value="price" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by price: low to high</option>
                                    <option value="price-desc" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by price: high to low</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6">
                        {products.map((product, id) => (
                            <li 
                                key={id} className="mb-2 h-[298px] md:h-[338px] lg:h-[442px] xl:h-[534px] px-2.5"
                            >
                                <div
                                    className={`relative cursor-pointer w-full h-[226px] sm:h-[250px] md:h-[233px] lg:h-[327px] xl:h-[414px]`}
                                    onMouseOver={() => setDisplayCart(id)}
                                    onMouseOut={() => setDisplayCart(null)}
                                >
                                    <Link href={`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                        <img src="/default.jpg" alt="" className="w-full h-full" />
                                    </Link>
                                    <AddToCart displayCart={displayCart} id={id} plantId={product.id} />
                                </div>
                                <div className="mt-2">
                                    <Link href={`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}`}>
                                        <h2 className="text-[16px] font-medium cursor-pointer">{product.name}</h2>
                                    </Link>
                                    <p className="text-[13.6px] font-navbar text-gray-400">{product.category_name}</p>
                                    <p className="text-[14.4px] font-navbar font-bold">${product.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
