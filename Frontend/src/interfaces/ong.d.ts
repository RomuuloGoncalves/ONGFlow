export interface Ong {
  id: number;
  id_endereco: number;
  login: string;
  senha: string;
  nome_fantasia: string;
  cnpj: string;
  sigla: string;
  data_fundacao: string;
}

export interface OngCadastro {
  nome: string;
  login: string;
  password?: string;
  nome_fantasia: string;
  cnpj: string;
  sigla: string;
  data_fundacao: string;
}
