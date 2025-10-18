<?php

namespace Database\Factories;

use App\Models\Endereco;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class OngFactory extends Factory
{
    public function definition(): array
    {
        return [
            'login' => fake()->unique()->userName(),
            'password' => Hash::make('password'),
            'nome' => fake()->company(),
            'nome_fantasia' => fake()->company(),
            'cnpj' => fake()->unique()->numerify('##.###.###/####-##'),
            'sigla' => fake()->lexify('???'),
            'data_fundacao' => fake()->date(),
            'id_endereco' => Endereco::factory(),
        ];
    }
}
