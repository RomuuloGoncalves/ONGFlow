<?php

namespace Database\Seeders;

use App\Models\Ong;
use App\Models\Endereco;
use Illuminate\Database\Seeder;

class OngSeeder extends Seeder
{
    public function run(): void
    {
        // Ong::factory()->create([
        //     'email' => 'a@a.a',
        //     'password' => 'asdasdasd',
        // ]);
        // Ong::factory(4)->create();

        $ongs = [
            [
                'ong' => [
                    'nome' => 'Associação Anjos da Noite',
                    'nome_fantasia' => 'Anjos da Noite',
                    'cnpj' => '11.222.333/0001-44',
                    'email' => 'a@a.a',
                    'password' => 'asdasdasd',
                    'data_fundacao' => '2010-01-15',
                ],
                'endereco' => [
                    'cep' => '01001-000',
                    'logradouro' => 'Praça da Sé',
                    'numero' => '100',
                    'bairro' => 'Sé',
                    'cidade' => 'São Paulo',
                    'estado' => 'SP',
                ],
            ],
            [
                'ong' => [
                    'nome' => 'Instituto Cuidando do Futuro',
                    'nome_fantasia' => 'Cuidando do Futuro',
                    'cnpj' => '22.333.444/0001-55',
                    'email' => 'cuidandodofuturo@email.com',
                    'password' => 'senha123',
                    'data_fundacao' => '2015-03-20',
                ],
                'endereco' => [
                    'cep' => '20040-004',
                    'logradouro' => 'Avenida Rio Branco',
                    'numero' => '200',
                    'bairro' => 'Centro',
                    'cidade' => 'Rio de Janeiro',
                    'estado' => 'RJ',
                ],
            ],
            [
                'ong' => [
                    'nome' => 'Organização Amigos da Natureza',
                    'nome_fantasia' => 'Amigos da Natureza',
                    'cnpj' => '33.444.555/0001-66',
                    'email' => 'amigosdanatureza@email.com',
                    'password' => 'senha123',
                    'data_fundacao' => '2012-06-08',
                ],
                'endereco' => [
                    'cep' => '30130-170',
                    'logradouro' => 'Avenida Afonso Pena',
                    'numero' => '300',
                    'bairro' => 'Centro',
                    'cidade' => 'Belo Horizonte',
                    'estado' => 'MG',
                ],
            ],
            [
                'ong' => [
                    'nome' => 'Sociedade Protetora SOS Animais',
                    'nome_fantasia' => 'SOS Animais',
                    'cnpj' => '44.555.666/0001-77',
                    'email' => 'sosanimais@email.com',
                    'password' => 'senha123',
                    'data_fundacao' => '2018-11-25',
                ],
                'endereco' => [
                    'cep' => '80020-320',
                    'logradouro' => 'Rua XV de Novembro',
                    'numero' => '400',
                    'bairro' => 'Centro',
                    'cidade' => 'Curitiba',
                    'estado' => 'PR',
                ],
            ],
            [
                'ong' => [
                    'nome' => 'Fundação Mãos que Ajudam',
                    'nome_fantasia' => 'Mãos que Ajudam',
                    'cnpj' => '55.666.777/0001-88',
                    'email' => 'maosqueajudam@email.com',
                    'password' => 'senha123',
                    'data_fundacao' => '2020-09-01',
                ],
                'endereco' => [
                    'cep' => '90010-110',
                    'logradouro' => 'Rua dos Andradas',
                    'numero' => '500',
                    'bairro' => 'Centro',
                    'cidade' => 'Porto Alegre',
                    'estado' => 'RS',
                ],
            ],
        ];

        foreach ($ongs as $data) {
            $endereco = Endereco::create($data['endereco']);
            
            $ongData = $data['ong'];
            $ongData['id_endereco'] = $endereco->id;

            Ong::create($ongData);
        }
    }
}
