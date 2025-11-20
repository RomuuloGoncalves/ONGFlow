<?php

namespace Database\Seeders;

use App\Models\Voluntario;
use Illuminate\Database\Seeder;

class VoluntarioSeeder extends Seeder
{
    public function run(): void
    {
        // Voluntario::factory()->create([
        //     'email' => 'a@a.a',
        //     'password' => 'asdasdasd',
        //     'id_endereco' => null,
        // ]);
        // Voluntario::factory(10)->create();

        $voluntarios = [
            [
                'nome' => 'Carlos Silva',
                'cpf' => '111.222.333-44',
                'email' => 'a@a.a',
                'password' => 'asdasdasd',
                'data_nascimento' => '1990-05-15',
                'telefone' => '11987654321',
                'bio' => 'Desenvolvedor de software apaixonado por tecnologia e voluntariado.',
                'status' => 'ativo',
                'id_endereco' => null,
            ],
            [
                'nome' => 'Mariana Costa',
                'cpf' => '222.333.444-55',
                'email' => 'mariana.costa@email.com',
                'password' => 'senha123',
                'data_nascimento' => '1992-08-22',
                'telefone' => '21987654322',
                'bio' => 'Designer gráfica com vontade de usar a criatividade para o bem.',
                'status' => 'ativo',
                'id_endereco' => null,
            ],
            [
                'nome' => 'João Oliveira',
                'cpf' => '333.444.555-66',
                'email' => 'joao.oliveira@email.com',
                'password' => 'senha123',
                'data_nascimento' => '1988-11-30',
                'telefone' => '31987654323',
                'bio' => 'Professor procurando oportunidades para ensinar e aprender.',
                'status' => 'ativo',
                'id_endereco' => null,
            ],
            [
                'nome' => 'Ana Souza',
                'cpf' => '444.555.666-77',
                'email' => 'ana.souza@email.com',
                'password' => 'senha123',
                'data_nascimento' => '1995-02-10',
                'telefone' => '41987654324',
                'bio' => 'Enfermeira dedicada a cuidar do próximo.',
                'status' => 'inativo',
                'id_endereco' => null,
            ],
            [
                'nome' => 'Pedro Santos',
                'cpf' => '555.666.777-88',
                'email' => 'pedro.santos@email.com',
                'password' => 'senha123',
                'data_nascimento' => '1985-07-25',
                'telefone' => '51987654325',
                'bio' => 'Gerente de projetos com experiência em liderança de equipes.',
                'status' => 'ativo',
                'id_endereco' => null,
            ],
        ];

        foreach ($voluntarios as $voluntarioData) {
            Voluntario::create($voluntarioData);
        }
    }
}
