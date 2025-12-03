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
        Schema::create('projetos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('descricao');
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->integer('quantidade_maxima_voluntarios')->nullable();
            $table->enum('status', ['ativo', 'cancelado', 'finalizado']);
            $table->foreignId('id_ong')->constrained('ongs')->onDelete('cascade');
            $table->foreignId('id_endereco')->nullable()->constrained('enderecos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projetos');
    }
};
