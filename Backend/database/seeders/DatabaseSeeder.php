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
        // Create Habilidades
        $habilidades = Habilidade::factory(100)->create();

        // Create Ongs
        $ongs = Ong::factory(10)->create();

        // Create Voluntarios and attach Habilidades
        $voluntarios = Voluntario::factory(50)->create()->each(function ($voluntario) use ($habilidades) {
            $voluntario->habilidades()->attach(
                $habilidades->random(rand(1, 5))->pluck('id')->toArray()
            );
        });

        // Create Projetos, attach Habilidades and Voluntarios
        foreach ($ongs as $ong) {
            Projeto::factory(rand(1, 5))->create([
                'id_ong' => $ong->id,
            ])->each(function ($projeto) use ($habilidades, $voluntarios) {
                // Attach Habilidades to Projeto
                $projeto->habilidades()->attach(
                    $habilidades->random(rand(1, 10))->pluck('id')->toArray()
                );
                // Attach Voluntarios to Projeto
                $projeto->voluntarios()->attach(
                    $voluntarios->random(rand(1, 10))->pluck('id')->toArray()
                );
            });
        }

        // Create Convites
        $projetos = Projeto::all();
        foreach ($projetos as $projeto) {
            $voluntariosDoProjeto = $projeto->voluntarios;
            foreach($voluntariosDoProjeto as $voluntario) {
                 // Create convite only if there are voluntarios in the projeto
                if ($voluntariosDoProjeto->isNotEmpty()) {
                    Convite::factory()->create([
                        'id_ong' => $projeto->ong->id,
                        'id_voluntario' => $voluntario->id,
                        'id_projeto' => $projeto->id,
                    ]);
                }
            }
        }
    }
}
