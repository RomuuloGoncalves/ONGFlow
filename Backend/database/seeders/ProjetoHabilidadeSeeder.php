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
            'Horta Comunitária no Bairro Sol Nascente' => ['Sustentabilidade e ecologia','Educação ambiental','Trabalho em equipe'],
            'Digitalização de Documentos Históricos' => ['Trabalho administrativo','Suporte técnico em TI','Análise de dados'],
            'Cineclube Semanal para a Terceira Idade' => ['Organização de atividades culturais','Comunicação interpessoal','Empatia'],
            'Reforma da Quadra de Esportes Local' => ['Trabalho em equipe','Liderança de equipes','Organização de eventos'],
            'Oficina de Música para Jovens Carentes' => ['Música e canto','Organização de atividades culturais','Ensino e tutoria'],
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
