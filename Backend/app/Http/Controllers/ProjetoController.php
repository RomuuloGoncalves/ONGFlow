<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Models\Voluntario;
use App\Models\Convite;
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
        $data = $request->all();
        $data['status'] = 'ativo';

        $projeto = Projeto::create($data);

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
        $projeto = Projeto::findOrFail($id);
        $voluntarioId = $request->input('voluntario_id');

        $conviteExistente = Convite::where('id_projeto', $projeto->id)
                                    ->where('id_voluntario', $voluntarioId)
                                    ->whereIn('status', ['pendente', 'aceito'])
                                    ->exists();
        
        if ($conviteExistente) {
            return response()->json(['message' => 'Voluntário já foi convidado ou já faz parte do projeto.'], 409);
        }

        $convite = Convite::create([
            'id_projeto' => $projeto->id,
            'id_voluntario' => $voluntarioId,
            'data_convite' => now(),
            'status' => 'pendente',
        ]);

        try {
            $projeto->voluntarios()->attach($voluntarioId, [
                'id_convite' => $convite->id,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            $convite->delete();
            return response()->json(['message' => 'Ocorreu um erro ao tentar associar o voluntário ao projeto.'], 500);
        }

        return response()->json([
            'message' => 'Convite enviado com sucesso!',
            'convite' => $convite,
        ], 201);
    }

    public function removerVoluntario(string $id, string $voluntarioId)
    {
        $projeto = Projeto::find($id);
        $projeto->voluntarios()->detach($voluntarioId);

        return response()->json(['message' => 'Voluntário removido com sucesso']);
    }
}
