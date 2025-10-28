<?php

namespace Database\Seeders;

use App\Models\Voluntario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class VoluntarioSeeder extends Seeder
{
    public function run(): void
    {
        // Cria o usuário de teste específico usando a factory original
        Voluntario::factory()->create([
            'email' => 'a@a.a',
            'password' => 'asdasdasd',
            'id_endereco' => null,
        ]);

        // Cria outros 10 voluntários aleatórios, como estava antes
        Voluntario::factory(10)->create();
    }
}
