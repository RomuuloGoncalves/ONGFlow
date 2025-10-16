<?php

use Illuminate\Support\Facades\Route;
use App\Models\Ong;
use App\Models\Voluntario;
use App\Models\Projeto;
use App\Models\Habilidade;

Route::prefix('tests')->group(function () {
    Route::get('ongs/{id}/projetos', function ($id) {
        return Ong::findOrFail($id)->projetos;
    });

    Route::get('voluntarios/{id}/projetos', function ($id) {
        return Voluntario::findOrFail($id)->projetos;
    });

    Route::get('voluntarios/{id}/habilidades', function ($id) {
        return Voluntario::findOrFail($id)->habilidades;
    });

    Route::get('projetos/{id}/ong', function ($id) {
        return Projeto::findOrFail($id)->ong;
    });

    Route::get('projetos/{id}/voluntarios', function ($id) {
        return Projeto::findOrFail($id)->voluntarios;
    });

    Route::get('projetos/{id}/habilidades', function ($id) {
        return Projeto::findOrFail($id)->habilidades;
    });

    Route::get('habilidades/{id}/voluntarios', function ($id) {
        return Habilidade::findOrFail($id)->voluntarios;
    });

    Route::get('habilidades/{id}/projetos', function ($id) {
        return Habilidade::findOrFail($id)->projetos;
    });
});
