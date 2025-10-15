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
        Schema::create('ong_voluntario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_voluntario')->constrained('voluntarios')->onDelete('cascade');
            $table->foreignId('id_ong')->constrained('ongs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ong_voluntario');
    }
};
