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
            'Sopão Solidário no Centro' => ['Trabalho em Equipe e Colaboração', 'Logística e Distribuição'],
            'Aulas de Reforço Escolar na Comunidade' => ['Ensino e Capacitação', 'Comunicação e Articulação'],
            'Mutirão de Limpeza na Praia' => ['Trabalho em Equipe e Colaboração', 'Liderança Comunitária'],
            'Feira de Adoção de Animais' => ['Comunicação e Articulação', 'Cuidado e Assistência Social'],
            'Campanha do Agasalho' => ['Organização de Eventos', 'Divulgação e Marketing Social'],
            'Horta Comunitária no Bairro Sol Nascente' => ['Habilidades Manuais (Cozinhar, Construir)','Ensino e Capacitação','Trabalho em Equipe e Colaboração'],
            'Digitalização de Documentos Históricos' => ['Habilidades Digitais (Redes Sociais, Design)','Logística e Distribuição','Organização de Eventos'],
            'Cineclube Semanal para a Terceira Idade' => ['Organização de Eventos','Comunicação e Articulação','Cuidado e Assistência Social'],
            'Reforma da Quadra de Esportes Local' => ['Trabalho em Equipe e Colaboração','Liderança Comunitária','Habilidades Manuais (Cozinhar, Construir)'],
            'Oficina de Música para Jovens Carentes' => ['Ensino e Capacitação','Organização de Eventos','Divulgação e Marketing Social'],
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
