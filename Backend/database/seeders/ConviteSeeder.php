<?php

namespace Database\Seeders;

use App\Models\Convite;
use App\Models\Projeto;
use App\Models\Voluntario;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ConviteSeeder extends Seeder
{
    public function run(): void
    {
        $convites = [
            [
                'projeto_nome' => 'Sopão Solidário no Centro',
                'voluntario_nome' => 'Carlos Silva',
                'status' => 'aceito',
            ],
            [
                'projeto_nome' => 'Aulas de Reforço Escolar na Comunidade',
                'voluntario_nome' => 'João Oliveira',
                'status' => 'aceito',
            ],
            [
                'projeto_nome' => 'Aulas de Reforço Escolar na Comunidade',
                'voluntario_nome' => 'Mariana Costa',
                'status' => 'pendente',
            ],
            [
                'projeto_nome' => 'Feira de Adoção de Animais',
                'voluntario_nome' => 'Ana Souza',
                'status' => 'aceito',
            ],
            [
                'projeto_nome' => 'Campanha do Agasalho',
                'voluntario_nome' => 'Pedro Santos',
                'status' => 'recusado',
            ],
            [
                'projeto_nome' => 'Sopão Solidário no Centro',
                'voluntario_nome' => 'Pedro Santos',
                'status' => 'pendente',
            ],
        ];

        foreach ($convites as $conviteData) {
            $projeto = Projeto::where('nome', $conviteData['projeto_nome'])->first();
            $voluntario = Voluntario::where('nome', $conviteData['voluntario_nome'])->first();

            if ($projeto && $voluntario) {
                $convite = Convite::create([
                    'id_ong' => $projeto->id_ong, // CORRIGIDO
                    'id_voluntario' => $voluntario->id,
                    'id_projeto' => $projeto->id,
                    'status' => $conviteData['status'],
                    'iniciador' => 'ong', // ADICIONADO
                    'mensagem' => 'Olá! Vimos seu perfil e achamos que você se encaixaria perfeitamente neste projeto. Gostaria de participar?', // ADICIONADO
                    'data_resposta' => in_array($conviteData['status'], ['aceito', 'recusado']) ? Carbon::now() : null, // ADICIONADO
                ]);

                if ($convite->status === 'aceito') {
                    // A lógica para anexar o voluntário ao projeto deve ser verificada
                    // Assumindo que a relação muitos-para-muitos está correta, este código deve funcionar.
                    // No entanto, as tabelas pivot também devem ser semeadas para refletir isso.
                    // Esta lógica está incompleta ou deve ser feita em um seeder separado.
                }
            }
        }
    }
}
