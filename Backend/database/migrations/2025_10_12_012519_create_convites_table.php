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
        Schema::create('convites', function (Blueprint $table) {
            $table->id();
            $table->enum('iniciador', ['pendente', 'aceito', 'recusado']);
            $table->longText('mensagem');
            $table->date('data_criacao');
            $table->date('data_resposta');
            // $table->integer('ong_id')->references('id')->on('ong');
            // $table->integer('voluntario_id')->references('id')->on('voluntario');
            // $table->integer('projeto_id')->references('id')->on('projeto');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convites');
    }
};
