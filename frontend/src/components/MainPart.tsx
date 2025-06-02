"use client"

import useMobileMenu from "@/stores/useMobileMenu"

export function MainPart({ children }: { children: React.ReactNode }) {
  const { setShowMobileMenu } = useMobileMenu()
  return (
    <div
      onClick={() => setShowMobileMenu(false)}
    >
      {children}
    </div>
  )
}
