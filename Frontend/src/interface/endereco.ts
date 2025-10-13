export interface Endereco {
 id: number;
 logradouro: string;
 numero: number;
 complemento?: string;
 bairro: string; 
 cidade: string;
 estado: string;
 cep: string;
}