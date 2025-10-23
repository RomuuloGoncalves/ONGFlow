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
            $table->foreignId('id_voluntario')->constrained('voluntarios')->onDelete('cascade');
            $table->foreignId('id_projeto')->constrained('projetos')->onDelete('cascade');
            $table->foreignId('id_convite')->constrained('convites')->onDelete('cascade');
            $table->unique(['id_voluntario', 'id_projeto', 'id_convite']);
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
