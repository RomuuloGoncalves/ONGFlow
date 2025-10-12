<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ConviteSeeder::class,
            HabilidadeSeeder::class,
            OngSeeder::class,
            ProjetoSeeder::class,
            VoluntarioSeeder::class,
        ]);
    }
}
