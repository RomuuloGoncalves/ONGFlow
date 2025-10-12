<?php

namespace Database\Seeders;

use App\Models\Convite;
use Illuminate\Database\Seeder;

class ConviteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Convite::factory(5)->create();
    }
}
