<?php

namespace App\Http\Controllers;

use App\Models\Ong;
use Illuminate\Http\Request;
use App\Http\Requests\Ong\StoreRequest;

class OngController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ongs = Ong::all();

        return response()->json($ongs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $ong = Ong::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Ong cadastrada com sucesso!',
                'data' => $ong,
            ], 201); // 201 Created

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar a ong.',
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
            $ong = ong::find($id);

            if($ong){

                return response()->json([
                    'success' => true,
                    'message' => 'Ong encontrado com sucesso!',
                    'data' => $ong,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Ong não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir a ong.',
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
            $Ong = Ong::findOrFail($id);
            $Ong->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Ong atualizada com sucesso!',
                'data' => $Ong,
            ], 200); // 200 OK

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar a ong.',
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
            $ong = Ong::find($id);

            if($ong){
                $ong->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Ong excluída com sucesso!',
                    'data' => $ong,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Ong não encontrada.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o ong.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }
}
