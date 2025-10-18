
export interface IConvite {
  id: number;
  titulo: string;
  descricao: string;
  status: "solicitado" | "pendente" | "recusado" | "aceito";
  localizacao: string;
  habilidades: string[];
  ong: string;
  telefone: string;
  dataHora: string;
}
