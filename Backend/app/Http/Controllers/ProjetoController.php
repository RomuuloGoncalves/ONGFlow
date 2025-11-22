<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Models\Voluntario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjetoController extends Controller
{
    public function index()
    {
        $projetos = Projeto::with(['habilidades', 'ong.endereco'])->get();
        return response()->json($projetos);
    }

    public function getProjetosPorOng(string $idOng)
    {
        $projetos = Projeto::with(['habilidades', 'ong.endereco'])->where('id_ong', $idOng)->get();
        return response()->json($projetos);
    }

    public function store(Request $request)
    {
        $projeto = Projeto::create($request->all());
        if ($request->has('habilidades')) {
            $projeto->habilidades()->sync($request->habilidades);
        }
        $projeto->load(['habilidades', 'ong.endereco']);
        return response()->json($projeto, 201);
    }

    public function show(string $id)
    {
        $projeto = Projeto::with(['habilidades', 'ong.endereco'])->find($id);
        return response()->json($projeto);
    }

    public function update(Request $request, string $id)
    {
        $projeto = Projeto::find($id);
        $projeto->update($request->all());
        if ($request->has('habilidades')) {
            $habilidades = $request->input('habilidades');
            $habilidadeIds = [];
            foreach ($habilidades as $habilidadeDescricao) {
                $habilidade = \App\Models\Habilidade::where('descricao', $habilidadeDescricao)->first();
                if ($habilidade) {
                    $habilidadeIds[] = $habilidade->id;
                }
            }
            $projeto->habilidades()->sync($habilidadeIds);
        }
        $projeto->load(['habilidades', 'ong.endereco']);
        return response()->json($projeto);
    }

    public function destroy(string $id)
    {
        Projeto::destroy($id);
        return response()->json(null, 204);
    }

    public function getVoluntarios(string $id)
    {
        $projeto = Projeto::find($id);
        $voluntarios = $projeto->voluntarios()->with('habilidades')->get();
        return response()->json($voluntarios);
    }

    public function getVoluntariosCompativeis(string $id)
    {
        $projeto = Projeto::with('habilidades', 'voluntarios')->find($id);
        $habilidadesProjetoIds = $projeto->habilidades->pluck('id');
        $voluntariosNoProjetoIds = $projeto->voluntarios->pluck('id');

        $voluntariosCompatíveis = Voluntario::with('habilidades')
            ->whereHas('habilidades', function ($query) use ($habilidadesProjetoIds) {
                $query->whereIn('habilidades.id', $habilidadesProjetoIds);
            })
            ->whereNotIn('id', $voluntariosNoProjetoIds)
            ->get();
        
        return response()->json($voluntariosCompatíveis);
    }

    public function adicionarVoluntario(Request $request, string $id)
    {
        $voluntarioId = $request->input('voluntario_id');

        $exists = DB::table('projeto_voluntario')
                        ->where('id_projeto', $id)
                        ->where('id_voluntario', $voluntarioId)
                        ->exists();

        if ($exists) {
            return response()->json(['message' => 'Voluntário já está no projeto'], 409); 
        }

        DB::table('projeto_voluntario')->insert([
            'id_projeto' => $id,
            'id_voluntario' => $voluntarioId,
            'id_convite' => null, 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Voluntário adicionado com sucesso']);
    }

    public function removerVoluntario(string $id, string $voluntarioId)
    {
        $projeto = Projeto::find($id);
        $projeto->voluntarios()->detach($voluntarioId);

        return response()->json(['message' => 'Voluntário removido com sucesso']);
    }
}
