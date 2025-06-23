<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_items;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
        $order->total_amount = $request->input('total_amount');
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
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
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
