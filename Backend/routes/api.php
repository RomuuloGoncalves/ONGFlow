<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\AuthController;


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

});

Route::prefix('')->group(function () {

});

Route::prefix('')->group(function () {

});
