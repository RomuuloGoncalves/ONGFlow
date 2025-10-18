import { Habilidade } from "./habilidade";

export interface Projeto {
  id: number;
  id_ong: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  status: "pendente" | "em andamento" | "concluido";
  habilidades: Habilidade[];
}
