<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projeto;
use App\Models\Convite;
use App\Models\Voluntario;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $ong = $request->user();

        // Stats
        $projetosAtivosCount = Projeto::where('id_ong', $ong->id)->where('status', 'ativo')->count();
        $projetosFinalizadosCount = Projeto::where('id_ong', $ong->id)->where('status', 'finalizado')->count();
        $voluntariosAtivosCount = Convite::where('id_ong', $ong->id)
            ->where('status', 'aceito')
            ->distinct('id_voluntario')
            ->count('id_voluntario');

        // Active Volunteers List (limit 5)
        $voluntariosAtivos = Convite::where('id_ong', $ong->id)
            ->where('status', 'aceito')
            ->with(['voluntario:id,nome', 'projeto:id,nome'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Available Volunteers (pending applications, limit 5)
        $voluntariosDisponiveis = Convite::where('id_ong', $ong->id)
            ->where('iniciador', 'voluntario')
            ->where('status', 'pendente')
            ->with('voluntario.habilidades')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Active Projects List (limit 5)
        $projetosAtivos = Projeto::where('id_ong', $ong->id)
            ->where('status', 'ativo')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Finished Projects List (limit 5)
        $projetosFinalizados = Projeto::where('id_ong', $ong->id)
            ->where('status', 'finalizado')
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'projetosAtivos' => $projetosAtivosCount,
                'projetosFinalizados' => $projetosFinalizadosCount,
                'voluntariosAtivos' => $voluntariosAtivosCount,
            ],
            'voluntariosAtivos' => $voluntariosAtivos,
            'voluntariosDisponiveis' => $voluntariosDisponiveis,
            'projetosAtivos' => $projetosAtivos,
            'projetosFinalizados' => $projetosFinalizados,
        ]);
    }
}
