<?php

namespace App\Http\Controllers;

use App\Models\Habilidade;
use Illuminate\Http\Request;
use App\Http\Requests\Habilidade\StoreRequest;

class HabilidadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $habilidades = Habilidade::all();

        return response()->json($habilidades);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $habilidade = Habilidade::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Habilidade cadastrada com sucesso!',
                'data' => $habilidade,
            ], 201); // 201 Created

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar a habilidade.',
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
            $habilidade = Habilidade::find($id);

            if($habilidade){

                return response()->json([
                    'success' => true,
                    'message' => 'Habilidade encontrada com sucesso!',
                    'data' => $habilidade,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Habilidade não encontrada.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir a habilidade.',
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
            $habilidade = Habilidade::findOrFail($id);
            $habilidade->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Habilidade atualizado com sucesso!',
                'data' => $habilidade,
            ], 200); // 200 OK

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar a habilidade.',
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
            $habilidade = Habilidade::find($id);

            if($habilidade){
                $habilidade->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Habilidade excluída com sucesso!',
                    'data' => $habilidade,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Habilidade não encontrada.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir a habilidade.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }
}
