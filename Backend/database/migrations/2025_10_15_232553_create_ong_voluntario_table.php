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
            $table->integer('id_voluntario')->references('id')->on('voluntarios');
            $table->integer('id_ong')->references('id')->on('ongs');
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
