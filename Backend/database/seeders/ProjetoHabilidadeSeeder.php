<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Projeto;
use App\Models\Habilidade;

class ProjetoHabilidadeSeeder extends Seeder
{
    public function run(): void
    {
        $associacoes = [
            'Sopão Solidário no Centro' => ['Trabalho em equipe', 'Organização de eventos'],
            'Aulas de Reforço Escolar na Comunidade' => ['Ensino e tutoria', 'Comunicação interpessoal'],
            'Mutirão de Limpeza na Praia' => ['Trabalho em equipe', 'Educação ambiental'],
            'Feira de Adoção de Animais' => ['Comunicação interpessoal', 'Empatia'],
            'Campanha do Agasalho' => ['Organização de eventos', 'Trabalho em equipe'],
        ];

        foreach ($associacoes as $nomeProjeto => $habilidadesDescricao) {
            $projeto = Projeto::where('nome', $nomeProjeto)->first();
            if ($projeto) {
                foreach ($habilidadesDescricao as $descricao) {
                    $habilidade = Habilidade::where('descricao', $descricao)->first();
                    if ($habilidade) {
                        $projeto->habilidades()->attach($habilidade->id);
                    }
                }
            }
        }
    }
}
