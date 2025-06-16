"use client"

import useLogOut from "@/stores/useLogOut"
import useMobileMenu from "@/stores/useMobileMenu"

export function MainPart({ children }: { children: React.ReactNode }) {
  const { setShowMobileMenu } = useMobileMenu()
  const { setShowLogOut } = useLogOut()
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
