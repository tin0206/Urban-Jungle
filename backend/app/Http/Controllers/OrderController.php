<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_items;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        $orders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'user_id' => $order->user_id,
                'first_name' => $order->first_name,
                'last_name' => $order->last_name,
                'country' => $order->country,
                'street_address' => $order->street_address,
                'postal_code' => $order->postal_code,
                'city' => $order->city,
                'phone' => $order->phone,
                'email' => $order->email,
                'additional_information' => $order->additional_information,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
                'order_date' => $order->created_at->toDateTimeString(),
            ];
        });

        return response()->json([
            'status' => 'success',
            'orders' => $orders,
        ]);
    }

    /**
     * Display a listing of the resource for API.
     */
    public function apiIndex(Request $request) {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find($request->input('user_id'));
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $order = new Order();
        $order->user_id = $request->input('user_id');
        $order->first_name = $request->input('first_name');
        $order->last_name = $request->input('last_name');
        $order->country = $request->input('country');
        $order->street_address = $request->input('street_address');
        $order->postal_code = $request->input('postal_code');
        $order->city = $request->input('city');
        $order->phone = $request->input('phone');
        $order->email = $request->input('email');
        $order->additional_information = $request->input('additional_information');
        $order->total_amount = (float) $request->input('total_amount');
        $order->status = 'pending';
        $order->save();

        $cartItems = $request->input('cart_items', []);
        foreach ($cartItems as $item) {
            $orderItem = new Order_items();
            $orderItem->order_id = $order->id;
            $orderItem->plant_id = $item['plant_id'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->price = $item['price'];
            $orderItem->total = $item['price'] * $item['quantity'];
            $orderItem->save();
        }

        return response()->json([
            'message' => 'Order created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id = null)
    {
        if ($id) {
            $order = Order::find($id);
            if (!$order) {
                return response()->json([
                    'message' => 'Order not found',
                ], 404);
            }

            $orderItems = Order_items::where('order_id', $order->id)->get();
            $items = $orderItems->map(function ($item) {
                return [
                    'plant_id' => $item->plant_id,
                    'plant_name' => $item->plant->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->total,
                ];
            });

            return response()->json([
                'status' => 'success',
                'order' => [
                    'id' => $order->id,
                    'user_id' => $order->user_id,
                    'first_name' => $order->first_name,
                    'last_name' => $order->last_name,
                    'country' => $order->country,
                    'street_address' => $order->street_address,
                    'postal_code' => $order->postal_code,
                    'city' => $order->city,
                    'phone' => $order->phone,
                    'email' => $order->email,
                    'additional_information' => $order->additional_information,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'order_date' => $order->created_at->toDateTimeString(),
                    'items' => $items,
                ],
            ]);
        } else {
            return response()->json([
                'message' => 'Order ID is required',
            ], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    public function updateStatus(Request $request, $id = null)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'message' => 'Order not found',
            ], 404);
        }

        $newStatus = $request->input('status');
        $validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'];
        if (!in_array($newStatus, $validStatuses)) {
            return response()->json([
                'message' => 'Invalid status value',
            ], 400);
        }

        $order->status = $newStatus;
        $order->save();

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
