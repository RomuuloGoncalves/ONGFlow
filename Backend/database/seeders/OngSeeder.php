<?php

namespace Database\Seeders;

use App\Models\Ong;
use Illuminate\Database\Seeder;

class OngSeeder extends Seeder
{
    public function run()
    {
        Ong::factory()->create([
            'email' => 'a@a.a',
            'password' => 'asdasdasd',
        ]);

        Ong::factory(4)->create();
    }
}
