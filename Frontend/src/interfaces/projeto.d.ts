import { Habilidade } from "./habilidade";
import { Ong } from "./ong";

export interface Projeto {
 id: number;
 situacao: 'andamento' | 'concluido' | 'cancelado';
 nome: string;
 descricao: string;
 quantidade_voluntarios: number;
 data_inicio: string;
 ong: Ong;
 habilidades: Habilidade[];
}