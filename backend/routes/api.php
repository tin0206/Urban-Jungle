<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShoppingCartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API route for categories
Route::get('/categories', [CategoryController::class, 'apiIndex']);

// API route for plants
Route::get('/plants', [\App\Http\Controllers\PlantController::class, 'apiIndex']);

// API route for shopping carts
Route::get('/shopping_cart/items', [ShoppingCartController::class, 'apiIndex']);

Route::post('/shopping_cart/add', [ShoppingCartController::class, 'store']);
