<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreate;
use App\Models\PersonalAccessToken;
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
        $users = User::all();
        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ];
        });
        return response()->json([
            'status' => 'success',
            'users' => $users,
        ]);
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
                'email' => $request->input('email'),
                'role' => $request->input('role', 'user'),
            ]);

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

        $name = $request->input('name');
        $password = $request->input('password');
        $user = User::where('name', $name)->first();
        if ($user) {
            if (!Hash::check($password,  $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Wrong password'
                ], 401);
            }
        }
        else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $cookie = cookie(
            'jwt_token',
            $token,
            60 * 24, // 1 day
            null,
            null,
            false,
            true
        );

        PersonalAccessToken::create([
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => now()->addDays(1),
        ]);

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
    public function user(Request $request) {
        $jwt_token = $request->bearerToken();
        $user = PersonalAccessToken::where('token', $jwt_token)->latest()->first()->user;
        if ($user) {
            return response()->json([
                'user' => $user,
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
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
    public function destroy($id = null)
    {
        if ($id) {
            $user = User::find($id);
            if ($user) {
                ShoppingCart::where('user_id', $user->id)->delete();
                $user->delete();
                return response()->json([
                    'message' => 'User deleted successfully!'
                ]);
            } else {
                return response()->json([
                    'message' => 'User not found!'
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'User ID is required!'
            ], 400);
        }
    }
}
