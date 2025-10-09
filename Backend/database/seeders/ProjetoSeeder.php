<?php

namespace Database\Seeders;

use App\Models\Projeto;
use Illuminate\Database\Seeder;

class ProjetoSeeder extends Seeder
{
    public function run(): void
    {
        Projeto::factory(8)->create();
    }
}
