<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoluntarioController;

Route::group(['prefix' => 'voluntarios'], function () {
    Route::post('/', [VoluntarioController::class, 'store']);
});

