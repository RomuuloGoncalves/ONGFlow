<?php

namespace Database\Seeders;

use App\Models\Convite;
use App\Models\Habilidade;
use App\Models\Ong;
use App\Models\Projeto;
use App\Models\Voluntario;
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
            EnderecoSeeder::class,
            VoluntarioSeeder::class,
            OngSeeder::class,
        ]);

        // Create Habilidades
        $habilidades = Habilidade::factory(100)->create();

        // Get all ongs and voluntarios
        $ongs = Ong::all();
        $voluntarios = Voluntario::all();


        // Create Projetos, attach Habilidades and Voluntarios via Convites
        foreach ($ongs as $ong) {
            Projeto::factory(rand(1, 5))->create([
                'id_ong' => $ong->id,
            ])->each(function ($projeto) use ($habilidades, $voluntarios) {
                // Attach Habilidades to Projeto
                $projeto->habilidades()->attach(
                    $habilidades->random(rand(1, 10))->pluck('id')->toArray()
                );

                // Select random volunteers, create convites, and attach them to the project
                $voluntariosToAttach = $voluntarios->random(rand(1, 10));
                foreach ($voluntariosToAttach as $voluntario) {
                    $convite = Convite::factory()->create([
                        'id_ong' => $projeto->id_ong,
                        'id_voluntario' => $voluntario->id,
                        'id_projeto' => $projeto->id,
                        'status' => 'aceito', // Assuming the invitation is accepted to create the link
                    ]);

                    // Attach voluntario to projeto with the convite id
                    $projeto->voluntarios()->attach($voluntario->id, ['id_convite' => $convite->id]);
                }
            });
        }

        $this->call([
            ConviteSeeder::class,
            ConviteSeeder::class,
        ]);
    }
}
