"use client"

import useMobileMenu from "@/stores/useMobileMenu"
import BotNavBar from "./BotNavBar"
import ReadyToFind from "./ReadyToFind"

export default function BotPart() {
  const { setShowMobileMenu } = useMobileMenu()
  return (
    <div
      onClick={() => {
        setShowMobileMenu(false)
      }}
    >
      <ReadyToFind />
      <BotNavBar />
    </div>
  )
}
