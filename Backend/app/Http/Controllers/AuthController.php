<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; 
use App\Models\Voluntario; 
use App\Models\Ong; 

class AuthController extends Controller
{

    public function loginVoluntario(Request $request)
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

    public function loginOng(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);

        $ong = Ong::where('email', $credentials['email'])->first();

        if (!$ong || !Hash::check($credentials['password'], $ong->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $ong->createToken($ong->nome . '-AuthToken')->plainTextToken;

        return response()->json([
            'message'      => 'Login de ONG bem-sucedido!',
            'ong'          => $ong,
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
