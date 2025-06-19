"use client"

import useLocalStorageCart from "@/stores/useLocalStorageCart"
import useLogOut from "@/stores/useLogOut"
import useMobileMenu from "@/stores/useMobileMenu"
import { useEffect } from "react"

export function MainPart({ children }: { children: React.ReactNode }) {
  const { setShowMobileMenu } = useMobileMenu()
  const { setShowLogOut } = useLogOut()
  const { createCart } = useLocalStorageCart()

  useEffect(() => {
    createCart()
  }, [])

  return (
    <div
      onClick={() => {
        setShowMobileMenu(false)
        setShowLogOut(false)
      }}
    >
      {children}
    </div>
  )
}
