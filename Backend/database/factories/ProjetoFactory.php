<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjetoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'descricao' => fake()->text(),
            'data_inicio' => fake()->date(),
            'quantidade_maxima_voluntarios' => fake()->numberBetween(1, 100),
            'status' => 'ativo',
        ];
    }
}
