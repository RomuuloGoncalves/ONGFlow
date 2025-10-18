import { Ong } from "./ong";
import { Projeto } from "./projeto";
import { Voluntario } from "./voluntario";

export interface Convite {
  id: number;
  iniciador: "ong" | "voluntario";
  status: "pendente" | "aceito" | "recusado";
  mensagem: string;
  data_resposta?: string;
  id_ong: number;
  id_voluntario: number;
  id_projeto?: number;
  created_at: string;
  updated_at: string;
  ong: Ong;
  voluntario: Voluntario;
  projeto?: Projeto;
}
