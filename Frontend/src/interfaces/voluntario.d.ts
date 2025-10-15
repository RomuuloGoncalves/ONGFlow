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

export interface VoluntarioCadastro {
  nome: string;
  email: string;
  password?: string;
  cpf: string;
  data_nascimento: string;
  telefone?: string;
}

export interface VoluntarioLogin {
  email: string;
  password: string;
}
