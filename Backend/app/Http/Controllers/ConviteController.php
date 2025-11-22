<?php

namespace App\Http\Controllers;

use App\Models\Convite;
use Illuminate\Http\Request;
use App\Http\Requests\Convite\StoreRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProjetoVoluntarioController;

class ConviteController extends Controller
{
    public function index(string $idVoluntario)
    {
        $convites = Convite::with(['projeto.ong', 'projeto.habilidades'])
            ->where('id_voluntario', $idVoluntario)
            ->get();

        return response()->json($convites);
    }

    public function getCandidaturas(Request $request)
    {
        try {
            $ong = Auth::user();
            $candidaturas = Convite::with(['projeto', 'voluntario'])
                ->where('id_ong', $ong->id)
                ->where('iniciador', 'voluntario')
                ->where('status', 'pendente')
                ->get();

            return response()->json($candidaturas);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao buscar as candidaturas.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function aceitar(string $id)
    {
        try {
            $convite = Convite::findOrFail($id);
            $convite->status = 'aceito';
            $convite->save();

            $projetoVoluntarioController = new ProjetoVoluntarioController();
            $response = $projetoVoluntarioController->store(
                $convite->id_voluntario,
                $convite->id_projeto,
                $convite->id
            );

            if ($response->getStatusCode() != 201) {
                return $response;
            }

            return response()->json(['message' => 'Convite aceito com sucesso.']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Convite não encontrado.'], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu um erro no servidor ao aceitar o convite.',
                'error' => $e->getMessage(),
            ], 500); // Erro interno
        }
    }

    public function recusar(string $id)
    {
        try {
            $convite = Convite::findOrFail($id);
            $convite->status = 'recusado';
            $convite->save();
            return response()->json(['message' => 'Convite recusado com sucesso.']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Convite não encontrado.'], 404);
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $convite = new Convite;
            $convite->iniciador = $validatedData['iniciador'];
            $convite->status = $validatedData['status'];
            $convite->mensagem = $validatedData['mensagem'];
            $convite->id_ong = $validatedData['id_ong'];
            $convite->id_voluntario = $validatedData['id_voluntario'];
            $convite->id_projeto = $validatedData['id_projeto'];
            $convite->save();

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
