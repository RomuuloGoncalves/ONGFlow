<?php

namespace Database\Factories;

use App\Models\Projeto;
use App\Models\Voluntario;
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
        $projeto = Projeto::inRandomOrder()->first();
        return [
            'id_voluntario' => Voluntario::inRandomOrder()->first()->id,
            'id_projeto' => $projeto->id,
            'id_ong' => $projeto->id_ong,
            'mensagem' => fake()->text(),
            'iniciador' => fake()->randomElement(['ong', 'voluntario']),
            'status' => 'pendente',
        ];
    }
}
