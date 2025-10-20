<?php

namespace App\Http\Controllers;

use App\Models\ProjetoVoluntario;
use Exception;

class ProjetoVoluntarioController extends Controller
{
    public function store($id_voluntario, $id_projeto, $id_convite)
    {
        try {
            $projetoVoluntario = ProjetoVoluntario::create([
                'id_voluntario' => $id_voluntario,
                'id_projeto' => $id_projeto,
                'id_convite' => $id_convite,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Projeto Voluntário cadastrado com sucesso!',
                'data' => $projetoVoluntario,
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
