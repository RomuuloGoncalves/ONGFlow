<?php

namespace Database\Factories;

use App\Models\Endereco;
use App\Models\Ong;
use Illuminate\Database\Eloquent\Factories\Factory;


class ProjetoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => fake()->company(),
            'descricao' => fake()->text(),
            'data_inicio' => fake()->date(),
            'quantidade_maxima_voluntarios' => fake()->numberBetween(1, 100),
            'status' => 'ativo',
            'id_ong' => Ong::factory(),
            'id_endereco' => Endereco::factory(),
        ];
    }
}
