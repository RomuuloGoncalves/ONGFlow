<?php

namespace App\Http\Controllers;

use App\Models\Habilidade;
use Illuminate\Http\Request;

class HabilidadeController extends Controller
{
    public function index()
    {
        $habilidades = Habilidade::all();
        return response()->json($habilidades);
    }

    public function store(Request $request)
    {
        $habilidade = Habilidade::create($request->all());
        return response()->json($habilidade, 201);
    }

    public function show(string $id)
    {
        $habilidade = Habilidade::find($id);
        return response()->json($habilidade);
    }

    public function update(Request $request, string $id)
    {
        $habilidade = Habilidade::find($id);
        $habilidade->update($request->all());
        return response()->json($habilidade);
    }

    public function destroy(string $id)
    {
        Habilidade::destroy($id);
        return response()->json(null, 204);
    }
}
