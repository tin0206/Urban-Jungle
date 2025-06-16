"use client"

import useMobileMenu from "@/stores/useMobileMenu"
import BotNavBar from "./BotNavBar"
import ReadyToFind from "./ReadyToFind"
import useLogOut from "@/stores/useLogOut"

export default function BotPart() {
  const { setShowMobileMenu } = useMobileMenu()
  const { setShowLogOut } = useLogOut()
  return (
    <div
      onClick={() => {
        setShowMobileMenu(false)
        setShowLogOut(false)
      }}
    >
      <ReadyToFind />
      <BotNavBar />
    </div>
  )
}
