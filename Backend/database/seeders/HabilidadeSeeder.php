<?php

namespace Database\Seeders;

use App\Models\Habilidade;
use Illuminate\Database\Seeder;

class HabilidadeSeeder extends Seeder
{
    public function run(): void
    {
        // Habilidade::factory(10)->create();

        $habilidades = [
            'Comunicação interpessoal',
            'Oratória e apresentação em público',
            'Escuta ativa',
            'Mediação de conflitos',
            'Trabalho em equipe',
            'Empatia',
            'Liderança de equipes',
            'Desenvolvimento de software',
            'Suporte técnico em TI',
            'Análise de dados',
            'Design gráfico',
            'Produção de vídeo',
            'Gestão de redes sociais',
            'Criação de conteúdo digital',
            'Gestão de projetos',
            'Planejamento estratégico',
            'Captação de recursos',
            'Organização de eventos',
            'Trabalho administrativo',
            'Primeiros socorros',
            'Apoio psicológico',
            'Cuidados com idosos',
            'Cuidados infantis',
            'Ensino e tutoria',
            'Alfabetização de adultos',
            'Desenvolvimento de material didático',
            'Educação ambiental',
            'Gestão de resíduos e reciclagem',
            'Sustentabilidade e ecologia',
            'Música e canto',
            'Teatro e artes cênicas',
            'Organização de atividades culturais',
        ];

        foreach ($habilidades as $descricao) {
            Habilidade::create(['descricao' => $descricao]);
        }
    }
}
