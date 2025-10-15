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
            $table->enum('iniciador', ['ong', 'voluntario']);
            $table->enum('status', ['pendente', 'aceito', 'recusado']);
            $table->longText('mensagem');
            $table->date('data_resposta')->nullable(); // A response date might not exist initially

            // Foreign keys
            $table->foreignId('id_ong')->constrained('ongs')->onDelete('cascade');
            $table->foreignId('id_voluntario')->constrained('voluntarios')->onDelete('cascade');
            $table->foreignId('id_projeto')->nullable()->constrained('projetos')->onDelete('cascade'); // An invitation might not be for a specific project

            $table->timestamps(); // Handles created_at and updated_at
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
