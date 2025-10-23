<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voluntario;
use App\Http\Requests\Voluntario\StoreRequest;
use Illuminate\Support\Facades\DB;

class VoluntarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voluntarios = Voluntario::all();

        return response()->json($voluntarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $voluntario = Voluntario::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Voluntário cadastrado com sucesso!',
                'data' => $voluntario,
            ], 201); // 201 Created

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o voluntário.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $voluntario = Voluntario::find($id);

            if($voluntario){

                return response()->json([
                    'success' => true,
                    'message' => 'Voluntário encontrado com sucesso!',
                    'data' => $voluntario,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Voluntário não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o voluntário.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }

    public function projetos(string $id)
    {
        try {
            $projetos = DB::table('projeto_voluntario')
                ->join('projetos', 'projeto_voluntario.id_projeto', '=', 'projetos.id')
                ->where('projeto_voluntario.id_voluntario', $id)
                ->select('projetos.*')
                ->get();

            return response()->json($projetos);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao buscar os projetos.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        try {
            $voluntario = Voluntario::findOrFail($id);
            $voluntario->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Voluntário atualizado com sucesso!',
                'data' => $voluntario,
            ], 200); // 200 OK

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o voluntário.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $voluntario = Voluntario::find($id);

            if($voluntario){
                $voluntario->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Voluntário excluído com sucesso!',
                    'data' => $voluntario,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Voluntário não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o voluntário.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }
}
