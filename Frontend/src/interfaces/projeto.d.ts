export interface Projeto {
 id: number;
 situacao: 'andamento' | 'concluido' | 'cancelado';
 descricao: string;
 quantidade_voluntarios: number;
 data_inicio: string;
}