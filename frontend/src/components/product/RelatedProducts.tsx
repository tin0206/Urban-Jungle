"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import AddToCart from "../AddToCart"
import Link from "next/link"
import "swiper/css"

type RelatedProductsProps = {
  product: Plant
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Plant[]>([])
  const [displayCart, setDisplayCart] = useState<number | null>(null)

  useEffect(() => {
    const productName = product.name.replace(/\s+/g, '-').toLowerCase()
    fetch('http://localhost:8000/api/plants/' + productName + '/related', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setRelatedProducts(data)
    })
    .catch((error) => {
      console.error("Error fetching related products:", error)
    })
  }, [])

  return (
    <div>
      <h2 className="text-[rgb(34,34,34)] text-[32.832px] lg:text-[38px] leading-[39.3984px] lg:leading-[50.4px] mb-[29.4px]">
        Related products
      </h2>
      <ul className="mb-4 gap-x-5 gap-y-6 grid grid-cols-2 md:grid-cols-4 h-[463.141px] overflow-y-auto">
        {relatedProducts.map((relatedProduct, id) => (
          <li key={id} className="mb-2 h-full px-2.5">
            <div
              className={`relative cursor-pointer aspect-[57/62]`}
              onMouseOver={() => setDisplayCart(id)}
              onMouseOut={() => setDisplayCart(null)}
            >
              <Link href={`/shop/${relatedProduct.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <img src="/default.jpg" alt="" className="w-full h-full" />
              </Link>
              <AddToCart displayCart={displayCart} id={id} plantId={relatedProduct.id} />
            </div>
            <div className="mt-2">
              <Link href={`/shop/${relatedProduct.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <h2 className="text-[16px] font-medium cursor-pointer">{relatedProduct.name}</h2>
              </Link>
              <p className="text-[13.6px] font-navbar text-gray-400">{relatedProduct.category_name}</p>
              <p className="text-[14.4px] font-navbar font-bold">${relatedProduct.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
