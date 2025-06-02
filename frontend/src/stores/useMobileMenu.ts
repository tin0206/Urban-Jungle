import { create } from "zustand"

interface MobileMenuStore {
    showMobileMenu: boolean
    setShowMobileMenu: (value: boolean) => void
}

const useMobileMenu = create<MobileMenuStore>((set) => ({
    showMobileMenu: false,
    setShowMobileMenu: (value: boolean) => set({ showMobileMenu: value }),
}))

export default useMobileMenu