export interface Voluntario {
    id: number;
    nome: string;
    email: string;
}

export interface VoluntarioCadastro {
    nome: string;
    email: string;
    senha?: string; 
}

export interface VoluntarioLogin {
    email: string;
    senha: string;
}