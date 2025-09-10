"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { User } from "@/app/model"
import useUserStore from "@/stores/useUserStore"

export default function UserManagement() {
    const [userList, setUserList] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const [error, setError] = useState("")
    const { user } = useUserStore()

    useEffect(() => {
        fetch("https://urban-jungle-production.up.railway.app/api/getUsers", {
            credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setUserList(data.users)
          })
          .catch((error) => {
            console.error("Error fetching users:", error)
        })
    }, [isAdding])

    const deleteUser = async (id: number) => {
        if (user && user?.role !== "admin") return

        setIsLoading(true)
        setIsDeleting(true)
        await fetch(`https://urban-jungle-production.up.railway.app/api/deleteUser/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id))
        })
        .catch((error) => {
            setError("Error deleting user!")
        })
        .finally(() => {
            setIsLoading(false)
            setIsDeleting(false)
        })
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
            return false
        }
        return true
    }

    const checkEmailValidation = () => {
        let messageLog = ""
        if (email.length === 0) {
            return true
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            messageLog += "Email format is invalid.\n"
        }
        if (email.length > 50) {
            messageLog += "Email cannot be longer than 50 characters.\n"
        }
        if (messageLog.length > 0) {
            setError(messageLog)
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (user && user?.role !== "admin") return

        setError("")
        if (!checkUserNameValidation() || !checkPassWordValidation() || !checkEmailValidation()) {
            return
        }

        setIsLoading(true)
        setIsAdding(true)
        await fetch("https://urban-jungle-production.up.railway.app/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role,
            })
        })
        .then(response => response.json())
        .then(data => {
            setName("")
            setEmail("")
            setPassword("")
            setRole("user")
        })
        .catch((error) => {
            setError("Error adding user!")
        })
        .finally(() => {
            setIsLoading(false)
            setIsAdding(false)
        })
    }

    return (
        <div className="py-3 w-full">
            <div>
                <div>
                    <h1 className="font-bold text-xl">
                        Add User
                    </h1>
                    <div className="flex flex-col space-y-1">
                        <h2>Username</h2>
                        <input type="text" disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={name} onChange={(e) => setName(e.target.value)} />
                        <h2>Password</h2>
                        <input type="password" disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <h2>Email</h2>
                        <input type="email" disabled={isLoading} className="border p-2 w-3/4 rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h2>Role</h2>
                        <select className="border p-2 w-3/4 rounded-full" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="flex space-x-2 mt-2">
                    <Button className="font-navbar rounded-3xl w-[80px] text-[16px] cursor-pointer bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300" disabled={isLoading && (isAdding || isDeleting)}
                        onClick={handleSubmit}
                    >
                        Add User
                    </Button>
                    <div className="flex items-center">
                        {isLoading && <p>Loading...</p>}
                    </div>
                </div>
                {error && <p className="text-red-500 mt-2 whitespace-pre-wrap">{error}</p>}
                <div className="mt-4">
                    <h1 className="font-bold text-xl">
                        Manage Users
                    </h1>
                    <div className="h-40 overflow-y-auto w-3/4 border">
                        {
                            isLoading && isDeleting ? (
                                <div role="status">
                                    <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                </div>
                            ) : (
                                <ul>
                                    {userList.map((user) => (
                                        <li key={user.id} className="flex ml-2 space-x-2 mb-1">
                                            <div>
                                                {user.name} - {user.role}
                                            </div>
                                            <div>
                                                <Button className="font-navbar rounded-3xl h-[25px] w-[80px] text-[16px] bg-red-500 hover:bg-red-600 cursor-pointer" onClick={() => deleteUser(user.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
