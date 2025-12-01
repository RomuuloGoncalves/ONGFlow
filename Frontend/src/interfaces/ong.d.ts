import { Endereco } from "./endereco";

export interface Ong {
  id: number;
  id_endereco: number;
  email: string;
  senha: string;
  nome: string;
  nome_fantasia: string;
  cnpj: string;
  sigla: string;
  data_fundacao: string;
  telefone?: string;
  endereco?: Endereco;
}

export interface OngCadastro {
  nome: string;
  email: string;
  password?: string;
  nome_fantasia: string;
  cnpj: string;
  sigla: string;
  data_fundacao: string;
}

export interface OngLogin {
  email: string;
  password: string;
}
