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
            $table->integer('id_voluntario')->references('id')->on('voluntario');
            $table->integer('id_habilidade')->references('id')->on('habilidade');
            $table->timestamps();
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
