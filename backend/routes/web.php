<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Category Routes
Route::get('/categories/create', [CategoryController::class, 'create'])
    ->name('categories.create');

Route::post('/categories', [CategoryController::class, 'store'])
    ->name('categories.store');

Route::get('/categories', [CategoryController::class, 'index'])
    ->name('categories.index');

// Plant Routes
Route::get('/plants/create', [\App\Http\Controllers\PlantController::class, 'create'])
    ->name('plants.create');

Route::post('/plants', [\App\Http\Controllers\PlantController::class, 'store'])
    ->name('plants.store');

Route::get('/plants', [\App\Http\Controllers\PlantController::class, 'index'])
    ->name('plants.index');
