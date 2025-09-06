"use client"

import { useLoginModal } from '@/stores/useLoginModal'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import useUserStore from '@/stores/useUserStore'
import { Button } from '../ui/button'
import { CartItem } from '@/app/model'
import useLocalStorageCart from '@/stores/useLocalStorageCart'
import { useCartStore } from '@/stores/useCartStore'

export default function LoginModal() {
    const { setShowLoginModal } = useLoginModal()
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const { setUser } = useUserStore()
    const { cart } = useLocalStorageCart()
    const [isLoading, setIsLoading] = useState(false)
    const { increment } = useCartStore()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!checkUserNameValidation() || !checkPassWordValidation() || !checkConfirmPasswordValidation()) {
            return
        }

        if (showSignUpModal) {
            try {
                const response = await fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        password
                    })
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data.message || "Failed to sign up.")
                    setShowError(true)
                    return
                }
                setShowSignUpModal(false)
            } catch (error) {
                setError("Failed to sign up. Please try again.")
                setShowError(true)
            }
        }
        else {
            try {
                const response = await fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name,
                        password
                    })
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data.message || "Failed to log in.")
                    setShowError(true)
                    return
                }
                setUser({
                    id: data.user?.id,
                    name: data.user?.name,
                    email: data.user?.email,
                    role: data.user?.role,
                })
                localStorage.setItem("jwt_token", data.token)
                await synchronizeCart()
            } catch (error) {
                setError("Failed to log in. Please try again.")
                setShowError(true)
            }
        }
    }

    const checkUserNameValidation = () => {
        let messageLog = ""
        if (name.length === 0) {
            messageLog = "Username cannot be empty.\n"
        }
        if (name.includes(" ")) {
            messageLog += "Username cannot contain spaces.\n"
        }
        if (name.length > 20) {
            messageLog += "Username cannot be longer than 20 characters.\n"
        }

        if (messageLog.length > 0) {
            setError(messageLog)
            setShowError(true)
            return false
        }
        return true
    }

    const checkPassWordValidation = () => {
        let messageLog = ""
        if (password.length === 0) {
            messageLog = "Password cannot be empty.\n"
        }
        if (password.includes(" ")) {
            messageLog += "Password cannot contain spaces.\n"
        }
        if (password.length > 20) {
            messageLog += "Password cannot be longer than 20 characters.\n"
        }

        if (messageLog.length > 0) {
            setError(messageLog)
            setShowError(true)
            return false
        }
        return true
    }

    const checkConfirmPasswordValidation = () => {
        if (!showSignUpModal) return true;
        
        let messageLog = ""
        if (confirmPassword !== password) {
            messageLog += "Confirm Password does not match Password.\n"
        }

        if (messageLog.length > 0) {
            setError(messageLog)
            setShowError(true)
            return false
        }
        return true
    }

    const synchronizeCart = async () => {
        setIsLoading(true)
        const cartItems : CartItem[] = []
        await fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/shopping_cart/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            cartItems.push(...data)
        })
        .catch((error) => {
            console.error("Error fetching cart items:", error)
        })

        const matchItems = cartItems.map((item: CartItem) => {
            const existingItem = cart.find(cartItem => cartItem.id === item.plant_id)
            if (existingItem) {
                return {
                    ...item,
                    quantity: Math.max(existingItem.quantity, item.quantity)
                }
            }
            return null
        }).filter(item => item !== null)

        if (matchItems.length > 0) {   
            await fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/shopping_cart/updateCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                },
                body: JSON.stringify({
                    items: matchItems
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update cart items in the database.")
            }})
        }
        
        const dbLackingItems = cart.filter(cartItem => !cartItems.some(dbItem => dbItem.plant_id === cartItem.id))

        if (dbLackingItems.length > 0) {
            await fetch("https://urbanjunglewebapplication-env.eba-bwwrnbuw.ap-southeast-1.elasticbeanstalk.com/api/shopping_cart/updateCartFromLocalStorage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
                },
                body: JSON.stringify({
                    items: dbLackingItems
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update cart items in the database.")
                }
            })
        }
        setTimeout(() => {
            setIsLoading(false)
            setShowLoginModal(false)
            increment()
        }, 1000)
    }

    return (
        <div 
            className="fixed inset-0 h-screen z-20 flex items-center justify-center w-screen bg-[rgba(17,17,17,0.5)]"
            onClick={() => {
                if (!isLoading) {
                    setShowLoginModal(false)
                }
            }}
        >
            <div 
                className="flex w-[400px] justify-center bg-white border rounded-[12px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex flex-col items-center py-8 px-10">
                    <img className="w-[150px] md:w-[200px] h-[41px]" src= "https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/normal-header.svg" alt="" />
                    <div className="text-center mt-6">
                        <h2 className="text-[16px] font-navbar font-semibold text-[rgb(17,17,17)] mb-2">
                            {
                                showSignUpModal ? "Create your Urban Jungle CO. account" : "Sign in to Urban Jungle CO."
                            }
                        </h2>
                        <p className="text-[14px] font-navbar text-[rgb(116,118,134)]">
                            {
                                showSignUpModal ? "Welcome! Please fill in the details to get started" : "Welcome back! Please sign in to continue"
                            }
                        </p>
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <Button className="w-[156px] px-3 py-1.5 h-[30px] cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300">
                            <div className="flex items-center justify-center gap-2">
                                <FaGoogle className="text-white" />
                                <span className="text-white text-[14px] font-navbar">
                                    Google
                                </span>
                            </div>
                        </Button>
                    </div>
                    <div className="mt-6 flex items-center">
                        <hr className="w-[137.859px]" />
                        <span className="mx-2 text-[rgb(116,118,134)] font-navbar text-[14px]">or</span>
                        <hr className="w-[137.859px]" />
                    </div>
                    <form action="post" className="mt-3 w-full" onSubmit={handleSubmit}>
                        <div>
                            <div className="font-navbar text-[14.4px] leading-[28.8px] font-medium">
                                Username
                            </div>
                            <input
                                type="text"
                                className="w-11/12 h-[30px] px-3 py-1.5 border text-[13px] border-[rgb(221,221,221)] rounded-[6px] focus:outline-none focus:border-[rgb(136,173,53)]"
                                placeholder="Enter your username"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="font-navbar text-[14.4px] leading-[28.8px] font-medium mt-1">
                                Password
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-11/12 h-[30px] px-3 py-1.5 border text-[13px] border-[rgb(221,221,221)] rounded-[6px] focus:outline-none focus:border-[rgb(136,173,53)]"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    showPassword ? (
                                        <FaEyeSlash 
                                            className="cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    ) : (
                                        <FaEye 
                                            className="cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    )
                                }
                            </div>
                            {
                                showSignUpModal && (
                                    <div>
                                        <div className="font-navbar text-[14.4px] leading-[28.8px] font-medium mt-1">
                                            Confirm Password
                                        </div>
                                        <div className='flex items-center gap-x-2'>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="w-full h-[30px] px-3 py-1.5 border text-[13px] border-[rgb(221,221,221)] rounded-[6px] focus:outline-none focus:border-[rgb(136,173,53)]"
                                                placeholder="Confirm your password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            {
                                                showConfirmPassword ? (
                                                    <FaEyeSlash 
                                                        className="cursor-pointer"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    />
                                                ) : (
                                                    <FaEye 
                                                        className="cursor-pointer"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                showError && (
                                    <div className="text-red-500 text-[12px] mt-1">
                                        {error.split("\n").map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                )
                            }
                            <Button
                                type="submit"
                                className="cursor-pointer w-full h-[30px] px-3 py-1.5 bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300 text-white text-[14px] font-navbar rounded-[6px] mt-3"
                                onClick={(e) => handleSubmit(e)}
                            >
                                {
                                    showSignUpModal ? "Sign Up" : "Sign In"
                                }
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-[rgb(116,118,134)] font-navbar text-[14px] flex items-center justify-center gap-x-1"> 
                        {
                            showSignUpModal ? "Already have an account?" : "Don't have an account?"
                        }
                        <div 
                            className="text-[rgb(136,173,53)] cursor-pointer hover:underline"
                            onClick={() => {
                                    setShowError(false)
                                    setName("")
                                    setPassword("")
                                    if (showSignUpModal) {
                                        setConfirmPassword("")
                                    }
                                    setShowSignUpModal(!showSignUpModal)
                                }
                            }
                        >
                            {
                                showSignUpModal ? "Sign In" : "Sign Up"
                            }
                        </div>
                    </div>
                    {
                        isLoading && (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.2)] bg-opacity-50">
                                <div role="status">
                                <svg aria-hidden="true" className="size-14 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
