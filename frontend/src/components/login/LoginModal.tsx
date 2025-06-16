"use client"

import { useLoginModal } from '@/stores/useLoginModal'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRef, useState } from 'react'
import useUserStore from '@/stores/useUserStore'
import { Button } from '../ui/button'

export default function LoginModal() {
    const { setShowLoginModal } = useLoginModal()
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    let username = useRef<HTMLInputElement>(null)
    let password = useRef<HTMLInputElement>(null)
    let confirmPassword = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const { setUser } = useUserStore()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!checkUserNameValidation() || !checkPassWordValidation() || !checkConfirmPasswordValidation()) {
            return
        }

        const usernameValue = username.current?.value
        const passwordValue = password.current?.value

        if (showSignUpModal) {
            try {
                const response = await fetch("http://localhost:8000/api/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: usernameValue,
                        password: passwordValue
                    })
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data.message || "Failed to sign up.")
                    setShowError(true)
                    return
                }
                setUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                })
                setShowLoginModal(false)
            } catch (error) {
                setError("Failed to sign up. Please try again.")
                setShowError(true)
            }
        }
        else {
            try {
                const response = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: usernameValue,
                        password: passwordValue
                    })
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data.message || "Failed to log in.")
                    setShowError(true)
                    return
                }
                setUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                })
                setShowLoginModal(false)
            } catch (error) {
                setError("Failed to log in. Please try again.")
                setShowError(true)
            }
        }
    }

    const checkUserNameValidation = () => {
        const usernameValue = username.current?.value || ""
        let messageLog = ""
        if (usernameValue.length === 0) {
            messageLog = "Username cannot be empty.\n"
        }
        if (usernameValue.includes(" ")) {
            messageLog += "Username cannot contain spaces.\n"
        }
        if (usernameValue.length > 20) {
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
        const passwordValue = password.current?.value || "";
        let messageLog = ""
        if (passwordValue.length === 0) {
            messageLog = "Password cannot be empty.\n"
        }
        if (passwordValue.includes(" ")) {
            messageLog += "Password cannot contain spaces.\n"
        }
        if (passwordValue.length > 20) {
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
        
        const passwordValue = password.current?.value || ""
        const confirmPasswordValue = confirmPassword.current?.value || ""
        let messageLog = ""
        if (confirmPasswordValue !== passwordValue) {
            messageLog += "Confirm Password does not match Password.\n"
        }

        if (messageLog.length > 0) {
            setError(messageLog)
            setShowError(true)
            return false
        }
        return true
    }

    return (
        <div 
            className="fixed inset-0 h-screen z-20 flex items-center justify-center w-screen bg-[rgba(17,17,17,0.5)]"
            onClick={() => setShowLoginModal(false)}
        >
            <div 
                className="flex w-[400px] justify-center bg-white border  rounded-[12px]"
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
                                ref={username}
                            />
                            <div className="font-navbar text-[14.4px] leading-[28.8px] font-medium mt-1">
                                Password
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-11/12 h-[30px] px-3 py-1.5 border text-[13px] border-[rgb(221,221,221)] rounded-[6px] focus:outline-none focus:border-[rgb(136,173,53)]"
                                    placeholder="Enter your password"
                                    ref={password}
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
                                                ref={confirmPassword}
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
                                    username.current!.value = ""
                                    password.current!.value = ""
                                    if (showSignUpModal) {
                                        confirmPassword.current!.value = ""
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
                </div>
            </div>
        </div>
    )
}
