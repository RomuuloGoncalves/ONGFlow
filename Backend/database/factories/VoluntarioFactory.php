<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

use App\Models\Endereco;

class VoluntarioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'password' => Hash::make('password'),
            'email' => fake()->unique()->safeEmail(),
            'cpf' => fake()->unique()->numerify('###########'),
            'data_nascimento' => fake()->date(),
            'telefone' => fake()->phoneNumber(),
            'bio' => fake()->text(),
            'status' => 'ativo',
            'id_endereco' => Endereco::factory(),
        ];
    }
}
