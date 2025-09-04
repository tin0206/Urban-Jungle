"use client"

import { useState } from "react"
import CategoryManagement from "./CategoryManagement"
import PlantManagement from "./PlantManagement"
import UserManagement from "./UserManagement"
import OrderManagement from "./OrderManagement"

export default function AdminDisplay() {
  const [mode, setMode] = useState<"pc" | "u" | "o">("pc")

  return (
    <div className="w-full">
      <div className="border-b">
        <ul className="flex space-x-4 mt-6">
          <li className={`hover:border-t hover:border-[rgb(136,173,53)] cursor-pointer ${mode === "pc" ? "border-t border-[rgb(136,173,53)]" : ""}`}
            onClick={() => setMode("pc")}
          >
            Plants and Categories
          </li>
          <li className={`hover:border-t hover:border-[rgb(136,173,53)] cursor-pointer ${mode === "u" ? "border-t border-[rgb(136,173,53)]" : ""}`}
            onClick={() => setMode("u")}
          >
            Users
          </li>
          <li className={`hover:border-t hover:border-[rgb(136,173,53)] cursor-pointer ${mode === "o" ? "border-t border-[rgb(136,173,53)]" : ""}`}
            onClick={() => setMode("o")}
          >
            Orders
          </li>
        </ul>
      </div>
      <div>
        {mode === "pc" ? (
          <>
            <CategoryManagement />
            <PlantManagement />
          </>
        ) : (
          mode === "u" ? (
            <UserManagement />
          ) : (
            <OrderManagement />
          )
        )}
      </div>
    </div>
  )
}
