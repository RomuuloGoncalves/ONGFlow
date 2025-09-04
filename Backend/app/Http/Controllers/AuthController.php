<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;  
use Illuminate\Auth\RequestGuard;

use Illuminate\Support\Facades\Hash; 
use App\Models\Voluntario; 

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);

        $voluntario = Voluntario::where('email', $credentials['email'])->first();

        if (!$voluntario || !Hash::check($credentials['password'], $voluntario->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $voluntario->createToken($voluntario->nome . '-AuthToken')->plainTextToken;

        return response()->json([
            'message'      => 'Login bem-sucedido!',
            'voluntario'   => $voluntario,
            'access_token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message"=> "Logout realizado com sucesso (token invalidado)"
        ]);
    }
}