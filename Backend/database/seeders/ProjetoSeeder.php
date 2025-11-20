<?php

namespace Database\Seeders;

use App\Models\Projeto;
use App\Models\Ong;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProjetoSeeder extends Seeder
{
    public function run(): void
    {
        $ongs = Ong::all();

        if ($ongs->isEmpty()) {
            $this->command->info('Nenhuma ONG encontrada. Execute o OngSeeder primeiro.');
            return;
        }

        $projetos = [
            [
                'id_ong' => $ongs->get(0)->id,
                'nome' => 'Sopão Solidário no Centro',
                'descricao' => 'Distribuição de sopa quente para pessoas em situação de rua no centro da cidade. Buscamos voluntários para preparo, organização e distribuição.',
                'status' => 'ativo',
                'data_inicio' => Carbon::now()->addDays(10),
                'id_endereco' => $ongs->get(0)->id_endereco,
            ],
            [
                'id_ong' => $ongs->get(1)->id,
                'nome' => 'Aulas de Reforço Escolar na Comunidade',
                'descricao' => 'Oferecemos aulas de reforço de matemática e português para crianças do ensino fundamental. Precisamos de voluntários com didática e paciência.',
                'status' => 'ativo',
                'data_inicio' => Carbon::now()->addWeeks(2),
                'id_endereco' => $ongs->get(1)->id_endereco,
            ],
            [
                'id_ong' => $ongs->get(2)->id,
                'nome' => 'Mutirão de Limpeza na Praia',
                'descricao' => 'Limpeza da faixa de areia e conscientização de banhistas sobre o descarte correto do lixo. Voluntários ajudarão na coleta e na distribuição de materiais educativos.',
                'status' => 'finalizado',
                'data_inicio' => Carbon::now()->subMonth(),
                'id_endereco' => $ongs->get(2)->id_endereco,
            ],
            [
                'id_ong' => $ongs->get(3)->id,
                'nome' => 'Feira de Adoção de Animais',
                'descricao' => 'Organização de uma feira para encontrar lares para cães e gatos resgatados. Precisamos de voluntários para cuidar dos animais e conversar com os possíveis adotantes.',
                'status' => 'ativo',
                'data_inicio' => Carbon::now()->addMonth(),
                'id_endereco' => $ongs->get(3)->id_endereco,
            ],
            [
                'id_ong' => $ongs->get(4)->id,
                'nome' => 'Campanha do Agasalho',
                'descricao' => 'Arrecadação e triagem de roupas de inverno para doação. Voluntários ajudarão na organização dos postos de coleta e na separação das doações.',
                'status' => 'finalizado',
                'data_inicio' => Carbon::now()->subYear(),
                'id_endereco' => $ongs->get(4)->id_endereco,
            ],
        ];

        foreach ($projetos as $projeto) {
            Projeto::create($projeto);
        }
    }
}
