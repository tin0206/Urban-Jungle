"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Category, Plant } from "@/app/model";

export default function PlantManagement() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModifying, setIsModifying] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [plantList, setPlantList] = useState<Plant[]>([])
    const [plantEditId, setPlantEditId] = useState<number | null>(null)
    const [plantName, setPlantName] = useState("")
    const [plantCategory, setPlantCategory] = useState<number | "">("")
    const [plantDescription, setPlantDescription] = useState("")
    const [plantPrice, setPlantPrice] = useState<number | "">("")
    const [mode, setMode] = useState<"add" | "edit">("add")

    useEffect(() => {
        fetch("http://localhost:8000/api/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategoryList(data)
                setPlantCategory(data[0]?.id || 1)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
            }
        )
    }, [])

    useEffect(() => {
        fetch("http://localhost:8000/api/plants")
            .then((response) => response.json())
            .then((data) => {
                setPlantList(data)
            })
            .catch((error) => {
                console.error("Error fetching plants:", error)
            })
    }, [isModifying])

    const editPlant = (id: number) => {
        const plant = plantList.find((plant) => plant.id === id)
        if (plant) {
            setMode("edit")
            setPlantEditId(plant.id)
            setPlantName(plant.name)
            setPlantCategory(categoryList.find((category) => category.name === plant.category_name)?.id || "")
            setPlantDescription(plant.description)
            setPlantPrice(plant.price)
        }
    }

    const addNewPlant = async () => {
        if (!plantName || !plantDescription || !plantPrice || plantPrice <= 0) return;
        setIsModifying(true);
        setIsLoading(true);
        await fetch('http://localhost:8000/api/plants/addPlant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantName,
                description: plantDescription,
                category_id: plantCategory,
                price: plantPrice,
            }),
        })
        .then(response => response.json())
        .then((data) => {
            setPlantName("")
            setPlantCategory(categoryList[0]?.id || 1)
            setPlantDescription("")
            setPlantPrice("")
        })
        .catch((error) => {
            console.error("Error adding plant:", error);
        })
        .finally(() => {
            setIsModifying(false);
            setIsLoading(false);
        })
    }

    const updatePlant = async (id: number) => {
        if (!plantName || !plantDescription || !plantPrice || plantPrice <= 0) return;

        setIsModifying(true);
        setIsLoading(true);
        await fetch(`http://localhost:8000/api/plants/updatePlant/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantName,
                description: plantDescription,
                category_id: plantCategory,
                price: plantPrice,
            }),
        })
        .then(response => response.json())
        .then((data) => {
            setPlantName("")
            setPlantCategory(categoryList[0]?.id || 1)
            setPlantDescription("")
            setPlantPrice("")
        })
        .catch((error) => {
            console.error("Error updating plant:", error);
        })
        .finally(() => {
            setIsModifying(false);
            setIsLoading(false);
        })
    }

    const deletePlant = async (id: number) => {
        setIsLoading(true);
        setIsDeleting(true);
        await fetch(`http://localhost:8000/api/plants/removePlant/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((data) => {
            setPlantList(plantList.filter((plant) => plant.id !== id));
        })
        .catch((error) => {
            console.error("Error deleting plant:", error);
        })
        .finally(() => {
            setIsLoading(false);
            setIsDeleting(false);
        })
    }

    return (
        <div className="py-3 w-full flex">
            <div className="w-1/2">
                <h1 className="font-bold text-xl">
                    Add Plant
                </h1>
                <div className="flex flex-col space-y-1">
                    <h2>Plant Name</h2>
                    <input type="text" disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                    <h2>Category</h2>
                    <select disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={plantCategory} onChange={(e) => setPlantCategory(Number(e.target.value))}>
                        {categoryList.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <h2>Description</h2>
                    <textarea disabled={isLoading} className="border p-2 w-3/4 h-24" value={plantDescription} onChange={(e) => setPlantDescription(e.target.value)} />
                    <h2>Price</h2>
                    <input type="number" disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={plantPrice} onChange={(e) => setPlantPrice(Number(e.target.value))} />
                </div>
            </div>
            <div className="w-1/2">
                <h1 className="font-bold text-xl">
                    Plant List
                </h1>
                <div className=" h-40 overflow-y-auto border mb-4">
                    {
                        isLoading && isDeleting ? (
                            <div role="status">
                                <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                        ) : (
                            <ul className="mt-1">
                                {plantList.map((plant) => (
                                    <li key={plant.id} className="flex ml-2 space-x-2 mb-1">
                                        <div className="cursor-pointer hover:underline" onClick={() => editPlant(plant.id)}>
                                            {plant.name}
                                        </div>
                                        <div>
                                            <Button className="font-navbar rounded-3xl h-[25px] w-[80px] text-[16px] bg-red-500 hover:bg-red-600 cursor-pointer" onClick={() => deletePlant(plant.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
                <div className="flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-2">
                    <Button
                        className="font-navbar rounded-3xl w-[80px] text-[16px] cursor-pointer bg-gray-400 hover:bg-gray-500 transition duration-300"
                        disabled={isLoading}
                        onClick={() => {
                            setMode("add")
                            setPlantName("")
                            setPlantCategory(categoryList[0]?.id || 1)
                            setPlantDescription("")
                            setPlantPrice("")
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        className={`font-navbar rounded-3xl w-[80px] text-[16px] cursor-pointer ${mode === "add" ? "bg-[rgb(136,173,53)] hover:bg-[#698927]" : "bg-gray-400 hover:bg-gray-500"} transition duration-300`}
                        disabled={isLoading}
                        onClick={addNewPlant}
                    >
                        Add
                    </Button>
                    <Button
                        className={`font-navbar rounded-3xl w-[80px] text-[16px] cursor-pointer ${mode === "edit" ? "bg-[rgb(136,173,53)] hover:bg-[#698927]" : "bg-gray-400 hover:bg-gray-500"} transition duration-300`}
                        disabled={isLoading}
                        onClick={() => updatePlant(plantEditId ?? 0)}
                    >
                        Update
                    </Button>
                </div>
                <div>
                    <p className="text-[rgb(136,173,53)]">{isLoading && !isDeleting ? "Modifying..." : " "}</p>
                </div>
            </div>
        </div>
  )
}
