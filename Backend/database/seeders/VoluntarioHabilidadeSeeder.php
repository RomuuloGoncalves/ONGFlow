<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voluntario;
use App\Models\Habilidade;

class VoluntarioHabilidadeSeeder extends Seeder
{
    public function run(): void
    {
        $associacoes = [
            'Lucas Ramalho Nogueira' => ['Comunicação e Articulação', 'Trabalho em Equipe e Colaboração', 'Logística e Distribuição'],
            'Mariana Costa' => ['Divulgação e Marketing Social', 'Organização de Eventos'],
            'João Oliveira' => ['Ensino e Capacitação', 'Liderança Comunitária'],
            'Ana Souza' => ['Primeiros Socorros', 'Cuidado e Assistência Social'],
            'Pedro Santos' => ['Gestão de Projetos Sociais', 'Captação de Recursos'],
        ];

        foreach ($associacoes as $nomeVoluntario => $habilidadesDescricao) {
            $voluntario = Voluntario::where('nome', $nomeVoluntario)->first();
            if ($voluntario) {
                foreach ($habilidadesDescricao as $descricao) {
                    $habilidade = Habilidade::where('descricao', $descricao)->first();
                    if ($habilidade) {
                        $voluntario->habilidades()->attach($habilidade->id);
                    }
                }
            }
        }
    }
}
