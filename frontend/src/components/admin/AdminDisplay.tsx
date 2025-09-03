"use client"

import CategoryManagement from "./CategoryManagement"
import PlantManagement from "./PlantManagement"

export default function AdminDisplay() {
  return (
    <div className="w-full">
      <CategoryManagement />
      <PlantManagement />
    </div>
  )
}
