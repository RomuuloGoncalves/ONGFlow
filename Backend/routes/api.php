<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\OngController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\HabilidadeController;
use App\Http\Controllers\ConviteController;


Route::prefix('voluntarios')->group(function () {

    Route::get('/', [VoluntarioController::class, 'index']);
    Route::post('/', [VoluntarioController::class, 'store']);
    Route::post('/login', [AuthController::class, 'login']);

    //Precisa estar logado como voluntário
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/{id}', [VoluntarioController::class, 'show']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::delete('/{id}', [VoluntarioController::class, 'destroy']);
        Route::put('/{id}', [VoluntarioController::class, 'update']);
    });
});


Route::prefix('ongs')->group(function () {

    Route::get('/', [OngController::class, 'index']);
    Route::post('/', [OngController::class, 'store']);
    Route::get('/{id}', [OngController::class, 'show']);
    Route::put('/{id}', [OngController::class, 'update']);
    Route::delete('/{id}', [OngController::class, 'destroy']);

    Route::post('/login', [AuthController::class, 'login']);

});

Route::prefix('projetos')->group(function () {

    Route::get('/', [ProjetoController::class, 'index']);
    Route::post('/', [ProjetoController::class, 'store']);
    Route::get('/{id}', [ProjetoController::class, 'show']);
    Route::put('/{id}', [ProjetoController::class, 'update']);
    Route::delete('/{id}', [ProjetoController::class, 'destroy']);

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
    Route::delete('/{id}', [ConviteController::class, 'destroy']);

});
