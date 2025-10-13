export interface Voluntario {
 id: number;
 id_endereco: number;
 nome: string;
 senha: string;
 cpf: string;
 email: string;
 data_nascimento: string;
 telefone?: string;
 situacao: 'ativo' | 'inativo';
}
