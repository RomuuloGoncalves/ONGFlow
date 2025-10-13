export interface VoluntarioCadastro {
  nome: string;
  email: string;
  senha: string;
  // Adicione outros campos conforme necessário
}

export interface VoluntarioLogin {
  email: string;
  senha: string;
}

export interface Voluntario {
  id: number;
  nome: string;
  email: string;
  // Adicione outros campos conforme necessário
}
