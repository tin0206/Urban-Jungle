"use client"

import { Plant } from "@/app/model"
import { useEffect, useState } from "react"
import Header from "./Header"
import ProductList from "./ProductList"

type ContentContainerProps = {
    category_name: string
}

export default function ContentContainer({ category_name }: ContentContainerProps) {
    const [plants, setPlants] = useState<Plant[]>([])
    const categoryName = category_name.replace(/-/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

    useEffect(() => {
        async function fetchPlants() {
            try {
                await fetch(`http://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/categories/${category_name}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setPlants(data)
                })
                .catch(error => {
                    console.error("Error fetching plants:", error)
                })
            } catch (error) {
                console.error("Error fetching plants:", error)
            }
        }

        fetchPlants()
    }, [])

    return (
        <div>
            <Header category_name={categoryName} />
            <ProductList plants={plants} />
        </div>
    )
}
