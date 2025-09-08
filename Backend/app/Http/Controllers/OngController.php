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
    public function show(Ong $ong)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ong $ong)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ong $ong)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ong $ong)
    {
        //
    }
}
