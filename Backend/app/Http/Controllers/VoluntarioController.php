<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voluntario;
use App\Http\Requests\Voluntario\StoreRequest;

class VoluntarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request) // Faça a injeção de dependência do StoreRequest
    {
        try {
            // A validação já foi executada pelo StoreRequest.
            // Se o código chegou até aqui, os dados são válidos.
            // O método validated() retorna um array com apenas os dados validados.
            $voluntario = Voluntario::create($request->validated());

            // Retorna a resposta de sucesso
            return response()->json([
                'success' => true,
                'message' => 'Voluntário cadastrado com sucesso!',
                'data' => $voluntario,
            ], 201); // 201 Created

        } catch (Exception $e) {
            // Tratamento para qualquer outro erro inesperado (ex: erro no banco de dados)
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao salvar o voluntário.',
                'error' => $e->getMessage(),
            ], 500); // 500 Internal Server Error
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
