<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\OngController;
use App\Http\Controllers\ProjetoController;
use App\Http\Controllers\HabilidadeController;
use App\Http\Controllers\ConviteController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VoluntarioHabilidadeController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::prefix('voluntarios')->group(function () {

    Route::get('/', [VoluntarioController::class, 'index']);
    Route::post('/', [VoluntarioController::class, 'store']);
    Route::post('/login', [AuthController::class, 'loginVoluntario']);

    //Precisa estar logado como voluntário
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/{id}', [VoluntarioController::class, 'show']);
        Route::get('/{id}/projetos', [VoluntarioController::class, 'projetos']);
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
        Route::get('/{idOng}/projetos', [ProjetoController::class, 'getProjetosPorOng']);
    });
});

Route::prefix('projetos')->group(function () {

    Route::get('/', [ProjetoController::class, 'index']);
    Route::post('/', [ProjetoController::class, 'store']);
    Route::get('/{id}', [ProjetoController::class, 'show']);
    Route::put('/{id}', [ProjetoController::class, 'update']);
    Route::put('/{id}/finalizar', [ProjetoController::class, 'finalizar']);
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
    Route::get('/pendente/{id_projeto}/{id_voluntario}', [ConviteController::class, 'verificarConvitePendente']);
});

Route::prefix('enderecos')->group(function () {

    Route::get('/', [EnderecoController::class, 'index']);
    Route::post('/', [EnderecoController::class, 'store']);
    Route::get('/{id}', [EnderecoController::class, 'show']);
    Route::put('/{id}', [EnderecoController::class, 'update']);
    Route::delete('/{id}', [EnderecoController::class, 'destroy']);

});


Route::prefix('voluntariohabilidades')->group(function () {

    Route::get('/', [VoluntarioHabilidadeController::class, 'index']);
    Route::post('/', [VoluntarioHabilidadeController::class, 'store']);
    Route::get('/{id}', [VoluntarioHabilidadeController::class, 'show']);
    Route::put('/{id}', [VoluntarioHabilidadeController::class, 'update']);
    Route::delete('/{id}', [VoluntarioHabilidadeController::class, 'destroy']);
    Route::get('/voluntario/{id}', [VoluntarioHabilidadeController::class, 'habilidadesVoluntario']);
    Route::post('/lote', [VoluntarioHabilidadeController::class, 'storeMany']);
    Route::post('/sync/{id}', [VoluntarioHabilidadeController::class, 'syncHabilidades']);
});

require __DIR__.'/test_routes.php';

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello World! A API esta no ar.'], 200);
});

// Rota temporária para rodar migrações
Route::get('/internal/run-migrations-once', function () {
    try {
        Artisan::call('migrate', ['--force' => true]);
        $output_migrate = Artisan::output();

        Artisan::call('migrate:refresh', [
            '--seed' => true,
            '--force' => true
        ]);
        $output_refresh_seed = Artisan::output();

        return response()->json([
            'status' => 'success',
            'message' => 'Comandos migrate e migrate:refresh --seed executados.',
            'output_migrate' => $output_migrate,
            'output_refresh_seed' => $output_refresh_seed
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Ocorreu um erro ao executar as migrações.',
            'error_message' => $e->getMessage()
        ], 500);
    }
});
