<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Convite>
 */
class ConviteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mensagem' => fake()->text(),
            'iniciador' => fake()->randomElement(['ong', 'voluntario']),
            'status' => 'pendente',
            'data_criacao' => fake()->date(),
            'data_resposta' => null,
        ];
    }
}
