<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\UserController;
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

// API route for user authentication
Route::post('/signup', [UserController::class, 'store']);

Route::post('/login', [UserController::class, 'login']);

// API route for categories
Route::get('/categories', [CategoryController::class, 'apiIndex']);

Route::get('/categories/{category_name}', [CategoryController::class, 'apiIndex']);

// API route for plants
Route::get('/plants', [\App\Http\Controllers\PlantController::class, 'apiIndex']);

Route::get('/plants/new-products', [\App\Http\Controllers\PlantController::class, 'apiNewProducts']);

Route::get('/plants/{plant_name}', [\App\Http\Controllers\PlantController::class, 'apiIndex']);

Route::get('/plants/{plant_name}/related', [\App\Http\Controllers\PlantController::class, 'apiRelated']);

// API route for shopping carts
Route::get('/shopping_cart/items', [ShoppingCartController::class, 'apiIndex']);

Route::get('/shopping_cart/quantity', [ShoppingCartController::class, 'getQuantity']);

Route::post('/shopping_cart/addItem', [ShoppingCartController::class, 'store']);

Route::post('/shopping_cart/updateCart', [ShoppingCartController::class, 'update']);

Route::post('/shopping_cart/removeItem', [ShoppingCartController::class, 'removeItem']);
