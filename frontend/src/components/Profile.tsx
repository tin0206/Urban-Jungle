"use client"

import { CgProfile } from "react-icons/cg"
import { Button } from "./ui/button"
import useUserStore from "@/stores/useUserStore"
import { useLoginModal } from "@/stores/useLoginModal"

type ProfileProps = {
  showMainMenu: boolean;
}

export default function Profile({ showMainMenu }: ProfileProps) {
  const { user } = useUserStore()
  const { setShowLoginModal } = useLoginModal()

  return (
    <div 
      className="ml-3"
    >
      { user ? (
        <CgProfile className={`${showMainMenu ? "text-white" : ""} size-6 cursor-pointer`} />
      ) : (
        <div>
          <Button
            className="font-navbar cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300"
            onClick={() => setShowLoginModal(true)}
          >
            <CgProfile className="size-6" />
            <span className="ml-2">Login</span>
          </Button>
        </div>
      )}
    </div>
  )
}
