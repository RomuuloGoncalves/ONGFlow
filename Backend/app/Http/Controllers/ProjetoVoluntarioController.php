<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Exception;

class ProjetoVoluntarioController extends Controller
{
    public function store($id_voluntario, $id_projeto, $id_convite)
    {
        try {
            // Verifica se o voluntário já está no projeto
            $existing = DB::table('projeto_voluntario')
                ->where('id_voluntario', $id_voluntario)
                ->where('id_projeto', $id_projeto)
                ->exists();

            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'Este voluntário já está no projeto.',
                ], 409); // 409 Conflict
            }

            DB::table('projeto_voluntario')->insert([
                'id_voluntario' => $id_voluntario,
                'id_projeto' => $id_projeto,
                'id_convite' => $id_convite,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Projeto Voluntário cadastrado com sucesso!',
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao salvar Projeto Voluntário.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
