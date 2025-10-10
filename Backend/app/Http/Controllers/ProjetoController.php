<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;
use App\Http\Requests\Projeto\StoreRequest;

class ProjetoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projetos = Projeto::all();

        return response()->json($projetos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $projeto = Projeto::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Projeto cadastrado com sucesso!',
                'data' => $projeto,
            ], 201); // 201 Created

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o projeto.',
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
            $projeto = Projeto::find($id);

            if($projeto){

                return response()->json([
                    'success' => true,
                    'message' => 'Projeto encontrado com sucesso!',
                    'data' => $projeto,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Projeto não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o projeto.',
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
            $projeto = Projeto::findOrFail($id);
            $projeto->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Projeto atualizado com sucesso!',
                'data' => $projeto,
            ], 200); // 200 OK

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o projeto.',
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
            $projeto = projeto::find($id);

            if($projeto){
                $projeto->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'projeto excluída com sucesso!',
                    'data' => $projeto,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'projeto não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o projeto.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }
}
