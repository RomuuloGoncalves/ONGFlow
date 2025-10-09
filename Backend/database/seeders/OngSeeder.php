<?php

namespace Database\Seeders;

use App\Models\Ong;
use Illuminate\Database\Seeder;

class OngSeeder extends Seeder
{
    public function run(): void
    {
        Ong::factory(5)->create();
    }
}
