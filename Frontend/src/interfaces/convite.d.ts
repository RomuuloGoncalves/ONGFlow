import { Projeto } from "./projeto";

export interface Convite {
 id: number;
 id_voluntario: number;
 id_ong: number;
 id_projeto: number;
 iniciador: 'ong' | 'voluntario';
 data_criacao: string;
 mensagem: string;
 data_resposta: string;
 status: string;
 projeto: Projeto;
}