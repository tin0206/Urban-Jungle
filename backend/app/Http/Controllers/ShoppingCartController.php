<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
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
    public function apiIndex()
    {
        $items = ShoppingCart::with('plant')->get();
        $items = $items->map(function ($item) {
            return [
                'id' => $item->id,
                'plant_id' => $item->plant_id,
                'plant_name' => $item->plant->name,
                'quantity' => $item->quantity,
                'price' => $item->plant->price,
            ];
        });

        return response()->json($items);
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
        $validated = $request->validate([
            'plant_id' => 'required|integer|exists:plants,id',
        ]);

        $quantity = $validated['quantity'] ?? 1;

        $existingItem = ShoppingCart::where('plant_id', $validated['plant_id'])->first();

        if ($existingItem) {
            $existingItem->quantity += $quantity;
            $existingItem->save();

            return response()->json([
                'message' => 'Item quantity updated successfully.',
                'cart_item' => $existingItem,
            ], 200);
        }

        $cartItem = ShoppingCart::create([
            'plant_id' => $validated['plant_id'],
            'quantity' => $quantity,
        ]);

        return response()->json([
            'message' => 'Item added to shopping cart successfully.',
            'cart_item' => $cartItem,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShoppingCart $shoppingCart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShoppingCart $shoppingCart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShoppingCart $shoppingCart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShoppingCart $shoppingCart)
    {
        //
    }
}
