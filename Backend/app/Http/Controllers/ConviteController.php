<?php

namespace App\Http\Controllers;

use App\Models\Convite;
use Illuminate\Http\Request;
use App\Http\Requests\Convite\StoreRequest;

class ConviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Convite::with(['projeto.ong.endereco', 'projeto.habilidades']);

        if ($request->has('idVoluntario')) {
            $query->where('id_voluntario', $request->input('idVoluntario'));
        }

        $convites = $query->get();

        return response()->json($convites);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $convite = Convite::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Convite cadastrado com sucesso!',
                'data' => $convite,
            ], 201); // 201 Created

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o convite.',
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
            $convite = Convite::find($id);

            if($convite){

                return response()->json([
                    'success' => true,
                    'message' => 'Convite encontrado com sucesso!',
                    'data' => $convite,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Convite não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o convite.',
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
            $convite = Convite::findOrFail($id);
            $convite->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Convite atualizado com sucesso!',
                'data' => $convite,
            ], 200); // 200 OK

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o convite.',
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
            $convite = Convite::find($id);

            if($convite){
                $convite->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Convite excluído com sucesso!',
                    'data' => $convite,
                ], 200); // 200 OK
            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Convite não encontrado.',
                ], 404); // 404 Not Found
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o convite.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }
}
