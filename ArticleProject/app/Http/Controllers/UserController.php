<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new user and return a success message.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // التحقق من صحة المدخلات
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // إنشاء المستخدم
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Cart::create([
            'user_id' => $user->id,
        ]);
        return response()->json(['message' => 'User and Cart created successfully!'], 201);
    }
    public function getAllUsers()
    {
       
        $users = User::all();

    
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}
