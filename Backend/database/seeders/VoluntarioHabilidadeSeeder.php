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
            'Carlos Silva' => ['Desenvolvimento de software', 'Trabalho em equipe'],
            'Mariana Costa' => ['Design gráfico', 'Comunicação interpessoal'],
            'João Oliveira' => ['Ensino e tutoria', 'Oratória e apresentação em público'],
            'Ana Souza' => ['Primeiros socorros', 'Empatia'],
            'Pedro Santos' => ['Gestão de projetos', 'Liderança de equipes'],
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
