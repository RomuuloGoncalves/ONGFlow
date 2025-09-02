<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoluntarioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui é onde pode registar as rotas da API para a sua aplicação.
| Estas rotas são carregadas pelo RouteServiceProvider e são todas
| atribuídas ao grupo de middleware "api".
|
*/

// A definir as rotas individualmente para ter controlo explícito.
// O Laravel irá mapear automaticamente os métodos do seu VoluntarioController.
Route::group(['prefix' => 'voluntarios'], function () {
    Route::post('/', [VoluntarioController::class, 'store']);
});


// Se precisar de outras rotas de API, pode adicioná-las aqui.
// Exemplo: Route::apiResource('projetos', ProjetoController::class);

