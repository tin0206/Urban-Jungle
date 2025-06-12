<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        //
        $username = $request->input('username');
        $password = $request->input('password');
        $userExists = User::where('name', $username)->exists();
        if ($userExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username already exists.'
            ], 400);
        }
        else {
            $user = User::create([
                'name' => $username,
                'password' => Hash::make($password),
            ]);
            $user->save();
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully.',
                'user' => $user
            ], 201);
        }
    }

    /**
     * Login a user.
     */
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::where('name', $username)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid username or password.'
            ], 401);
        }

        // $token = $user->createToken('auth_token')->plainTextToken;

        // $cookie = cookie('auth_toke', $token, 60*24, null, null, true, true);

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful.',
            'user' => $user,
        ], 200);

        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Login successful.',
        //     'user' => $user,
        //     'token' => $token
        // ], 200)->withCookie($cookie);
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
