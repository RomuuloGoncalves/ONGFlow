import { Endereco } from "./endereco";
import { Habilidade } from "./habilidade";
import { Ong } from "./ong";
import { Voluntario } from "./voluntario";

export interface Projeto {
  id: number;
  id_ong: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  status: "pendente" | "ativo" | "finalizado";
  habilidades?: Habilidade[];
  ong?: Ong;
  endereco?: Endereco;
  voluntarios?: Voluntario[];
}

export interface DashboardProjeto {
  id: number;
  nome: string;
  data_inicio: string;
  data_fim?: string;
  data_final?: string;
}
