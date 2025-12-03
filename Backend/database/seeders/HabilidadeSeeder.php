<?php

namespace Database\Seeders;

use App\Models\Habilidade;
use Illuminate\Database\Seeder;

class HabilidadeSeeder extends Seeder
{
    public function run(): void
    {
        $habilidades = [
            'Comunicação e Articulação',
            'Captação de Recursos',
            'Organização de Eventos',
            'Gestão de Projetos Sociais',
            'Trabalho em Equipe e Colaboração',
            'Liderança Comunitária',
            'Ensino e Capacitação',
            'Cuidado e Assistência Social',
            'Habilidades Manuais (Cozinhar, Construir)',
            'Divulgação e Marketing Social',
            'Primeiros Socorros',
            'Apoio Psicológico',
            'Tradução e Interpretação',
            'Logística e Distribuição',
            'Habilidades Digitais (Redes Sociais, Design)',
        ];

        foreach ($habilidades as $descricao) {
            Habilidade::create(['descricao' => $descricao]);
        }
    }
}
