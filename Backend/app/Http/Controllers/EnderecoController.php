<?php

namespace App\Http\Controllers;

use App\Models\Endereco;
use Illuminate\Http\Request;
use App\Http\Requests\Endereco\StoreRequest; // Crie se for usar validação customizada
use Exception;

class EnderecoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enderecos = Endereco::all();

        return response()->json($enderecos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $endereco = Endereco::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Endereço cadastrado com sucesso!',
                'data' => $endereco,
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o endereço.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $endereco = Endereco::find($id);

            if ($endereco) {
                return response()->json([
                    'success' => true,
                    'message' => 'Endereço encontrado com sucesso!',
                    'data' => $endereco,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Endereço não encontrado.',
                ], 404);
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao buscar o endereço.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        try {
            $endereco = Endereco::findOrFail($id);
            $endereco->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Endereço atualizado com sucesso!',
                'data' => $endereco,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao atualizar o endereço.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $endereco = Endereco::find($id);

            if ($endereco) {
                $endereco->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Endereço excluído com sucesso!',
                    'data' => $endereco,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Endereço não encontrado.',
                ], 404);
            }

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao excluir o endereço.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
