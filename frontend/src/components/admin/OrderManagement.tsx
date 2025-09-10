"use client"

import { Order, OrderInformation } from "@/app/model"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import useUserStore from "@/stores/useUserStore"

export default function OrderManagement() {
    const [orderList, setOrderList] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [orderId, setOrderId] = useState<number | null>(null)
    const [orderInfo, setOrderInfo] = useState<OrderInformation | null>(null)
    const [status, setStatus] = useState<string>("pending")
    const [isUpdating, setIsUpdating] = useState(false)
    const { user } = useUserStore()

    useEffect(() => {
        fetch('https://urban-jungle-production.up.railway.app//api/orders')
        .then(response => response.json())
        .then(data => setOrderList(data.orders))
        .catch(error => console.error('Error fetching orders:', error));
    }, [isUpdating])

    const fetchOrder = async (id: number) => {
        if (user && user?.role !== "admin") return

        setOrderId(id)
        setIsLoading(true)
        await fetch(`https://urban-jungle-production.up.railway.app//api/orders/${id}`)
        .then(response => response.json())
        .then(data => {
            setOrderInfo(data.order)
            setStatus(data.order.status)
            setIsLoading(false)
        })
        .catch(error => {
            console.error('Error fetching order:', error)
            setIsLoading(false)
        })
    }

    const updateStatus = async (id: number, status: string) => {
        if (user && user?.role !== "admin") return

        setIsLoading(true)
        setIsUpdating(true)
        await fetch(`https://urban-jungle-production.up.railway.app//api/orders/updateStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'status': status }),
        })
        .then(response => response.json())
        .then(data => {
            setOrderInfo(prev => prev ? { ...prev, status } : null);
        })
        .catch(error => {
            console.error('Error updating order status:', error);
        })
        .finally(() => {
            setIsLoading(false)
            setIsUpdating(false)
        });
    }

    return (
        <div className="py-3 w-full">
            <h1 className="font-bold text-xl">Order Management</h1>
            <div className="flex h-160">
                <div className="w-1/2 h-40 overflow-y-auto border">
                    {
                        isLoading ? (
                            <div role="status">
                                <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-[rgb(136,173,53)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                        ) : (
                            orderList.length === 0 ? (
                                <div>
                                    <p className="m-2">No orders found.</p>
                                </div>
                            ) : (
                                <ul className="mt-3">
                                    {orderList.map((order) => (
                                        <li key={order.id} className="flex ml-2 space-x-2 mb-1" onClick={() => fetchOrder(order.id)}>
                                            <p className="hover:underline cursor-pointer">Order ID: {order.id}, Status: {order.status}, Ordered Date: {order.order_date}</p>
                                        </li>
                                    ))}
                                </ul>
                            )
                        )
                    }
                </div>
                <div className="w-1/2 ml-4">
                    {
                        orderId && (
                            <div>
                                <h1>Order Information:</h1>
                                <p>Order ID: {orderInfo?.id}</p>
                                <p>User ID: {orderInfo?.user_id}</p>
                                <p>Name: {orderInfo?.first_name} {orderInfo?.last_name}</p>
                                <p>Country: {orderInfo?.country}</p>
                                <p>Street Address: {orderInfo?.street_address}</p>
                                <p>Postal Code: {orderInfo?.postal_code}</p>
                                <p>City: {orderInfo?.city}</p>
                                <p>Phone: {orderInfo?.phone}</p>
                                <p>Email: {orderInfo?.email}</p>
                                <p>Additional Information: {orderInfo?.additional_information}</p>
                                <p>Order Date: {orderInfo?.order_date}</p>
                                <div className="mt-2 border p-2">
                                    <h2>Order Items:</h2>
                                    <ul>
                                        {orderInfo?.items.map((item, idx)=> (
                                            <li key={idx}>
                                                {item.plant_name} - Price: {item.price} - Quantity: {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="mt-2 font-bold">Total Price: {orderInfo?.total_amount}</p>
                                <p>Status: {orderInfo?.status}</p>
                                <select className="border mt-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <Button className="ml-2 font-navbar rounded-3xl text-[16px] bg-[rgb(136,173,53)] hover:bg-[#698927] transition duration-300 cursor-pointer"
                                    disabled={isLoading}
                                    onClick={() => updateStatus(orderId, status)}
                                >
                                    Update Status
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
