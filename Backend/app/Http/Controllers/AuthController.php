<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voluntario;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|string|email',
            'senha' => 'required|string|min:8' // O campo é 'senha'
        ]);

        // Busca o voluntário pelo e-mail
        $voluntario = Voluntario::where('email', $login['email'])->first();

        // Verifica se o voluntário existe e se a senha está correta
        if (!$voluntario || !Hash::check($login['senha'], $voluntario->senha)) {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401); // Unauthorized
        }

        // Cria e retorna o token de autenticação
        $token = $voluntario->createToken($voluntario->nome . '-AuthToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return response()->json([
        "message"=>"logged out"
        ]);
    } 
}
