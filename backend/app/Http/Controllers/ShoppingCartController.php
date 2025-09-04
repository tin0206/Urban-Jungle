<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $items = $user->shoppingCarts()->with('plant')->get();
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
     * Get the total quantity of items in the shopping cart.
     */
    public function getQuantity(Request $request)
    {
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $totalQuantity = $user->shoppingCarts()->count();
        return response()->json(['total_quantity' => $totalQuantity]);
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
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'plant_id' => 'required|integer|exists:plants,id',
            'quantity' => 'nullable|integer|min:1',
            'user_id' => 'nullable|integer|exists:users,id',
        ]);

        $quantity = $validated['quantity'] ?? 1;



        $existingItem = ShoppingCart::where('plant_id', $validated['plant_id'])
                                    ->where('user_id', $user->id)
                                    ->first();

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
            'user_id' => $validated['user_id'],
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
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:shopping_carts,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        foreach ($validated['items'] as $itemData) {
            $item = ShoppingCart::find($itemData['id']);
            if ($item) {
                $item->quantity = $itemData['quantity'];
                $item->save();
            } else {
                return response()->json(['message' => 'Item not found in the shopping cart.'], 404);
            }
        }

        return response()->json(['message' => 'Shopping cart updated successfully.'], 200);
    }

    /**
     * Update the shopping cart from local storage.
     */
    public function updateFromLocalStorage(Request $request)
    {
        $validated = $request->validate([
            'items'=> 'required',
        ]);

        foreach ($validated['items'] as $itemData) {
            $cartItem = ShoppingCart::create([
                'plant_id' => $itemData['id'],
                'quantity' => $itemData['quantity'],
                'user_id' => Auth::guard('api')->id(),
            ]);
            $cartItem->save();
        }

        return response()->json(['message' => 'Shopping cart updated from local storage successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShoppingCart $shoppingCart)
    {
        //
    }

    /**
     * Remove an item from the shopping cart.
     */
    public function removeItem(Request $request)
    {
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'item_id' => 'required|integer|exists:shopping_carts,id',
        ]);

        $item = ShoppingCart::find($validated['item_id']);
        if (!$item) {
            return response()->json(['message' => 'Item not found in the shopping cart.'], 404);
        }
        $item->delete();
        return response()->json(['message' => 'Item removed from the shopping cart successfully.'], 200);
    }

    /**
     * Clear the shopping cart.
     */
    public function clearCart(Request $request) {
        /** @var User $user */
        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        ShoppingCart::where('user_id', $user->id)->delete();
        return response()->json(['message' => 'Shopping cart cleared successfully.'], 200);
    }
}
