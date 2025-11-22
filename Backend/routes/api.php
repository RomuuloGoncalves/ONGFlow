<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\OngController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\HabilidadeController;
use App\Http\Controllers\ConviteController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\DashboardController;


Route::prefix('voluntarios')->group(function () {

    Route::get('/', [VoluntarioController::class, 'index']);
    Route::post('/', [VoluntarioController::class, 'store']);
    Route::post('/login', [AuthController::class, 'loginVoluntario']);

    //Precisa estar logado como voluntário
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/{id}', [VoluntarioController::class, 'show']);
        Route::get('/{id}/projetos', [VoluntarioController::class, 'projetos']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::delete('/{id}', [VoluntarioController::class, 'destroy']);
        Route::put('/{id}', [VoluntarioController::class, 'update']);
        Route::get('/{idVoluntario}/convites', [ConviteController::class, 'index']);
    });
});


Route::prefix('ongs')->group(function () {

    Route::get('/', [OngController::class, 'index']);
    Route::post('/', [OngController::class, 'store']);
    Route::post('/login', [AuthController::class, 'loginOng']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::get('candidaturas', [ConviteController::class, 'getCandidaturas']);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/{id}', [OngController::class, 'show']);
        Route::put('/{id}', [OngController::class, 'update']);
        Route::delete('/{id}', [OngController::class, 'destroy']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/{idOng}/projetos', [ProjetoController::class, 'getProjetosPorOng']);
    });
});

Route::prefix('projetos')->group(function () {

    Route::get('/', [ProjetoController::class, 'index']);
    Route::post('/', [ProjetoController::class, 'store']);
    Route::get('/{id}', [ProjetoController::class, 'show']);
    Route::put('/{id}', [ProjetoController::class, 'update']);
    Route::delete('/{id}', [ProjetoController::class, 'destroy']);
    Route::get('/{id}/voluntarios', [ProjetoController::class, 'getVoluntarios']);
    Route::get('/{id}/voluntarios-compativeis', [ProjetoController::class, 'getVoluntariosCompativeis']);
    Route::post('/{id}/voluntarios', [ProjetoController::class, 'adicionarVoluntario']);
    Route::delete('/{id}/voluntarios/{idVoluntario}', [ProjetoController::class, 'removerVoluntario']);

});

Route::prefix('habilidades')->group(function () {

    Route::get('/', [HabilidadeController::class, 'index']);
    Route::post('/', [HabilidadeController::class, 'store']);
    Route::get('/{id}', [HabilidadeController::class, 'show']);
    Route::put('/{id}', [HabilidadeController::class, 'update']);
    Route::delete('/{id}', [HabilidadeController::class, 'destroy']);

});

Route::prefix('convites')->group(function () {

    Route::get('/', [ConviteController::class, 'index']);
    Route::post('/', [ConviteController::class, 'store']);
    Route::get('/{id}', [ConviteController::class, 'show']);
    Route::put('/{id}', [ConviteController::class, 'update']);
    Route::put('/{id}/aceitar', [ConviteController::class, 'aceitar']);
    Route::put('/{id}/recusar', [ConviteController::class, 'recusar']);
    Route::delete('/{id}', [ConviteController::class, 'destroy']);

});

Route::prefix('enderecos')->group(function () {

    Route::get('/', [EnderecoController::class, 'index']);
    Route::post('/', [EnderecoController::class, 'store']);
    Route::get('/{id}', [EnderecoController::class, 'show']);
    Route::put('/{id}', [EnderecoController::class, 'update']);
    Route::delete('/{id}', [EnderecoController::class, 'destroy']);

});

require __DIR__.'/test_routes.php';
