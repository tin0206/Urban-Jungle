"use client"

import { Category } from "@/app/model"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    fetch("https://urban-jungle-production.up.railway.app/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error)
      })
  }, [])

  return (
    <div className="w-full px-6 md:px-8 lg:px-10">
        <div className="w-full py-16 md:py-20 flex flex-col gap-y-[60px] text-center items-center">
          <h1 className="text-[32px] font-medium">Our Categories</h1>
          <ul className="max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-5">
            {categories.map((category, id) => (
              <li key={id} className="w-full">
                <Link href={`/category/${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <div className="cursor-pointer">
                    <img src="/default.jpg" alt="" />
                  </div>
                </Link>
                <Link href={`/category/${category.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h2 className="text-[21px] w-full text-gray-800 mt-2 cursor-pointer">
                    {category.name}
                  </h2> 
                </Link>
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}
