"use client"

import { CgProfile } from "react-icons/cg"
import { Button } from "../ui/button"
import useUserStore from "@/stores/useUserStore"
import { useLoginModal } from "@/stores/useLoginModal"
import useLogOut from "@/stores/useLogOut"
import { useCartStore } from "@/stores/useCartStore"

type ProfileProps = {
  showMainMenu: boolean;
}

export default function Profile({ showMainMenu }: ProfileProps) {
  const { user, clearUser } = useUserStore()
  const { setShowLoginModal } = useLoginModal()
  const { showLogOut, setShowLogOut } = useLogOut()
  const { click, increment } = useCartStore()

  return (
    <div 
      className="ml-3"
    >
      { user ? (
        <>
          <div className="w-full h-full relative z-30">
            <CgProfile 
              className={`${showMainMenu ? "text-white" : ""} size-6 cursor-pointer`} 
              onClick={() => setShowLogOut(!showLogOut)}
            />
            {
              showLogOut && (
                <Button 
                  className="mt-2 font-navbar cursor-pointer absolute w-[60px] h-[35px] text-[14px] translate-x-[-20px] transition duration-300"
                  onClick={() => {
                    clearUser()
                    localStorage.removeItem("auth_token")
                    increment()
                    setShowLogOut(false)
                  }}
                >
                  Log out
                </Button>
              )
            }
          </div>
        </>
      ) : (
        <div>
          <Button
            className="font-navbar cursor-pointer transition duration-300"
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
