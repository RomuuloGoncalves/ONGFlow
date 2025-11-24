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
        Schema::create('voluntario_habilidade', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('id_voluntario');
    $table->unsignedBigInteger('id_habilidade');

    $table->foreign('id_voluntario')->references('id')->on('voluntarios')->onDelete('cascade');
    $table->foreign('id_habilidade')->references('id')->on('habilidades')->onDelete('cascade');

    $table->unique(['id_voluntario', 'id_habilidade']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voluntario_habilidade');
    }
};
