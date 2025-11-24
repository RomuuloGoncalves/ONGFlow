<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VoluntarioHabilidade;
use App\Models\Habilidade;
use App\Models\Voluntario;
use Illuminate\Support\Facades\DB;

class VoluntarioHabilidadeController extends Controller
{
    /**
     * Lista todos os vínculos voluntario-habilidade
     */
    public function index()
    {
        try {
            $dados = VoluntarioHabilidade::all();

            return response()->json([
                'success' => true,
                'data' => $dados
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar vínculos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cria um único vínculo voluntario-habilidade
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_voluntario' => 'required|integer|exists:voluntarios,id',
                'id_habilidade' => 'required|integer|exists:habilidades,id',
            ]);

            $registro = VoluntarioHabilidade::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Vínculo criado com sucesso!',
                'data' => $registro
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erros de validação.',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar vínculo.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Retorna um vínculo específico
     */
    public function show(string $id)
    {
        try {
            $registro = VoluntarioHabilidade::find($id);

            if (!$registro) {
                return response()->json([
                    'success' => false,
                    'message' => 'Registro não encontrado.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $registro
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar registro.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza o vínculo
     */
    public function update(Request $request, string $id)
    {
        try {
            $registro = VoluntarioHabilidade::findOrFail($id);

            $validated = $request->validate([
                'id_voluntario' => 'sometimes|integer|exists:voluntarios,id',
                'id_habilidade' => 'sometimes|integer|exists:habilidades,id',
            ]);

            $registro->fill($validated);
            $registro->save();

            return response()->json([
                'success' => true,
                'message' => 'Vínculo atualizado!',
                'data' => $registro
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erros de validação.',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar vínculo.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Deleta o vínculo
     */
    public function destroy(string $id)
    {
        try {
            $registro = VoluntarioHabilidade::find($id);

            if (!$registro) {
                return response()->json([
                    'success' => false,
                    'message' => 'Registro não encontrado.',
                ], 404);
            }

            $registro->delete();

            return response()->json([
                'success' => true,
                'message' => 'Vínculo deletado com sucesso!',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar vínculo.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Retorna todas as habilidades de um voluntário
     */
    public function habilidadesVoluntario(string $id_voluntario)
    {
        try {
            $habilidades = DB::table('voluntario_habilidade')
                ->join('habilidades', 'voluntario_habilidade.id_habilidade', '=', 'habilidades.id')
                ->where('voluntario_habilidade.id_voluntario', $id_voluntario)
                ->select('habilidades.*')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $habilidades
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar habilidades do voluntário.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeMany(Request $request)
    {
        try {
            $validated = $request->validate([
                '*.id_voluntario' => 'required|integer|exists:voluntarios,id',
                '*.id_habilidade' => 'required|integer|exists:habilidades,id',
            ]);

            VoluntarioHabilidade::insert($validated);

            return response()->json([
                'success' => true,
                'message' => 'Habilidades vinculadas com sucesso!',
                'data' => $validated
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erros de validação.',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar vínculos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

public function syncHabilidades(Request $request, $voluntarioId)
{
    $data = $request->validate([
        'habilidades' => 'required|array',
        'habilidades.*' => 'integer|exists:habilidades,id',
    ]);

    try {
        $voluntario = Voluntario::findOrFail($voluntarioId);
        $voluntario->habilidades()->sync($data['habilidades']);

        return response()->json([
            'success' => true,
            'message' => 'Habilidades sincronizadas com sucesso.',
        ]);

    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao sincronizar habilidades.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}