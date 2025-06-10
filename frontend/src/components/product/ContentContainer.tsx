"use client"

import { Plant } from "@/app/model";
import { useEffect, useState } from "react";
import MainPart from "./MainPart";
import RelatedProducts from "./RelatedProducts";

type ProductPageProps = {
    product_name: string
}

export default function ContentContainer({ product_name }: ProductPageProps) {
    const [product, setProduct] = useState<Plant>()

    useEffect(() => {
        async function fetchProduct() {
            try {
                await fetch(`http://localhost:8000/api/plants/${product_name}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setProduct(data)
                })
                .catch(error => {
                    console.error("Error fetching product:", error)
                })
            } catch (error) {
                console.error("Error fetching product:", error)
            }
        }

        fetchProduct()
    }, [])
  
    return (
    <div className="w-full h-full flex flex-col items-center border-t">
      <div className="max-w-[1200px] px-5">
        <div className="w-full h-full xl:my-[60px]">
            {
                product ? (
                    <div className="w-full h-full">
                        <MainPart product={product} />
                        <RelatedProducts product={product} />
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
      </div>
    </div>
  )
}
