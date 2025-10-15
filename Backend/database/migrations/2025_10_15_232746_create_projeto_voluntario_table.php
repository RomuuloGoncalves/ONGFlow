<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projeto_voluntario', function (Blueprint $table) {
            $table->id();
            $table->integer('id_voluntario')->references('id')->on('voluntario');
            $table->integer('id_projeto')->references('id')->on('projeto');
            $table->integer('id_convite')->references('id')->on('convite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projeto_voluntario');
    }
};
