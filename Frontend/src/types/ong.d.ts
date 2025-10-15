export interface OngCadastro {
  nome: string;
  login: string;
  password?: string;
  password_confirmation?: string;
  nome_fantasia: string;
  cnpj: string;
  sigla: string;
  data_fundacao: string;
}