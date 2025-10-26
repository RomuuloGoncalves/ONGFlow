export interface Voluntario {
  id: number;
  nome: string;
  // senha: string;
  cpf: string;
  email: string;
  data_nascimento: string;
  telefone?: string;
  // status: 'ativo' | 'inativo';
  status: string;
  bio: string;
  id_endereco: number;
}

export interface VoluntarioCadastro {
  nome: string;
  email: string;
  password?: string;
  cpf: number;
  data_nascimento: string;
  telefone?: string;
  status: 'ativo';
}

export interface VoluntarioLogin {
  email: string;
  password: string;
}
