<?php

namespace Database\Seeders;

use App\Models\Voluntario;
use Illuminate\Database\Seeder;

class VoluntarioSeeder extends Seeder
{
    public function run(): void
    {
        Voluntario::factory(10)->create();
    }
}
