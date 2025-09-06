"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export default function ProductList() {
    const [products, setProducts] = useState<Plant[]>([])
    const [displayList, setDisplayList] = useState<Plant[]>([])
    const [sortBy, setSortBy] = useState<string>("menu_order")
    const [maxPage, setMaxPage] = useState(0)
    const [offSet, setOffSet] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [displayCart, setDisplayCart] = useState<number | null>(null)
    
    useEffect(() => {
        fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/plants")
        .then((response) => response.json())
        .then((data) => {
            setProducts(data)
            setMaxPage(Math.ceil(data.length / offSet))
            setDisplayList(data.slice(0, offSet))
        })
        .catch((error) => {
            console.error("Error fetching products:", error)
        })
    }, [])

    useEffect(() => {
        const startIndex = currentPage * offSet
        const endIndex = startIndex + offSet
        setDisplayList(products.slice(startIndex, endIndex))
    }, [currentPage, products, offSet])

    useEffect(() => {
        if (products.length === 0) return

        let sortedProducts = [...products]
        switch (sortBy) {
            case "popularity":
                break
            case "rating":
                break
            case "date":
                sortedProducts.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
                break
            case "price":
                sortedProducts.sort((a, b) => a.price - b.price)
                break
            case "price-desc":
                sortedProducts.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }
        const startIndex = currentPage * offSet
        const endIndex = startIndex + offSet
        setDisplayList(sortedProducts.slice(startIndex, endIndex))
    }, [sortBy, products, currentPage])

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
                        <div className="flex sm:justify-end mr-2.5 mb-[29.184px] sm:mb-[36.48px] md:mb-10">
                            <select 
                                className="px-2 pb-2 pt-2.5 text-[rgb(69,69,69)]"
                                name="orderby" 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)} 
                            >
                                <option value="menu_order" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Default sorting</option>
                                <option value="popularity" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by popularity</option>
                                <option value="rating" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by average rating</option>
                                <option value="date" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by latest</option>
                                <option value="price" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by price: low to high</option>
                                <option value="price-desc" className="font-navbar text-[16px] text-[rgb(69,69,69)] px-0.5 pb-[1px]">Sort by price: high to low</option>
                            </select>
                        </div>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 relative">
                        {displayList.map((product, id) => (
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
                        {
                            displayList.length !== 0 && products.length > offSet && (
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
        </div>
    )
}
