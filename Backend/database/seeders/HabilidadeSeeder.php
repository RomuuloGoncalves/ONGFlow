<?php

namespace Database\Seeders;

use App\Models\Habilidade;
use Illuminate\Database\Seeder;

class HabilidadeSeeder extends Seeder
{
    public function run(): void
    {
        Habilidade::factory(10)->create();
    }
}
