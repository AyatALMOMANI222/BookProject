<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookCartController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [UserController::class, 'create']);
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'getAllUsers']);

Route::middleware('auth:sanctum')->post('/book', [BookController::class, 'store']);

Route::middleware('auth:sanctum')->put('/book/{id}', [BookController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/book/{id}', [BookController::class, 'delete']);
Route::get('/allBook', [BookController::class, 'getAllBooks']);
Route::middleware('auth:sanctum')->get('/book', [BookController::class, 'getBooksByUserId']);

Route::get('/cart', [CartController::class, 'getCartByUserId']);
Route::middleware('auth:sanctum')->post('/cart/add-book', [BookCartController::class, 'addBookToCart']);
Route::middleware('auth:sanctum')->delete('/cart/book', [BookCartController::class, 'deleteBookFromCart']);
Route::middleware('auth:sanctum')->get('/cart/myBook', [CartController::class, 'getBooksFromCart']);
