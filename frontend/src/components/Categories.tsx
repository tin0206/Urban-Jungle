"use client"

import { Category } from "@/app/model"
import { useEffect, useState } from "react"

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
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
        <div className="w-full py-16 md:py-20 flex flex-col gap-y-[60px] text-center">
          <h1 className="text-[32px] font-medium">Our Categories</h1>
          <ul className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
            {categories.map((category, id) => (
              <li key={id} className="w-full">
                <div>
                  <img
                    src="./default.jpg" alt=""
                  />
                </div>
                <h2 className="text-[21px] w-full text-gray-800">
                  {category.name}
                </h2>
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}
