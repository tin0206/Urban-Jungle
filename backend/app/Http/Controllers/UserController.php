<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreate;
use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

use function PHPSTORM_META\map;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(UserCreate $request)
    {
        $userExists = User::where('name',  $request->input('name'))->exists();
        if ($userExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username already exists.'
            ], 400);
        }
        else {
            $user = User::create([
                'name' => $request->input('name'),
                'password' => Hash::make($request->input('password')),
            ]);

            $user->save();
            return response()->json([
                'user' => $user,
                'status' => 'success',
            ], 201);
        }
    }

    /**
     * Login a user.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('name', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $cookie = cookie(
            'jwt_token',
            $token,
            60 * 24,
            null,
            null,
            false,
            true
        );

        return response()->json([
            'user' => Auth::user(),
            'token' => $token,
        ])->withCookie($cookie);
    }

    /**
     * Logout a user.
     */
    public function logout(Request $request)
    {
        $cookie = Cookie::forget('jwt_token');

        return response()->json([
            'status' => 'success',
        ], 200)->withCookie($cookie);
    }

    /**
     * Display the authenticated user.
     */
    public function user() {
        return Auth::user();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
