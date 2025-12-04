import api from "./api";
import type { Projeto } from "../interfaces/projeto";
import type { Habilidade } from "../interfaces/habilidade";
import type { Voluntario } from "../interfaces/voluntario";
import type { AxiosPromise } from "axios";

// interface ProjetosResponse {
//   data: Projeto[];
// }

interface VoluntariosResponse {
  data: Voluntario[];
}

export const getProjetosPorOng = (idOng: number): AxiosPromise<Projeto[]> => {
  return api.get<Projeto[]>(`/ongs/${idOng}/projetos`);
};

export const getProjetos = (): AxiosPromise<Projeto[]> => {
  return api.get<Projeto[]>("/projetos");
};

export const getProjeto = (id: number): AxiosPromise<any> => {
  return api.get<any>(`/projetos/${id}`);
};

export const createProjeto = (data: any): AxiosPromise<Projeto> => {
  return api.post<Projeto>('/projetos', data);
};

export const updateProjeto = (id: number, data: any): AxiosPromise<Projeto> => {
  return api.put<Projeto>(`/projetos/${id}`, data);
};

export const finalizarProjeto = (id: number): AxiosPromise<any> => {
  return api.put(`/projetos/${id}/finalizar`);
};

export const cancelarProjeto = (id: number): AxiosPromise<any> => {
  return api.put(`/projetos/${id}/cancelar`);
};

export const getHabilidades = (): AxiosPromise<Habilidade[]> => {
  return api.get<Habilidade[]>("/habilidades");
};

export const getVoluntariosDoProjeto = (id: number): AxiosPromise<VoluntariosResponse> => {
  return api.get<VoluntariosResponse>(`/projetos/${id}/voluntarios`);
};

export const getVoluntariosCompativeis = (id: number): AxiosPromise<Voluntario[]> => {
  return api.get<Voluntario[]>(`/projetos/${id}/voluntarios-compativeis`);
};

export const adicionarVoluntarioAoProjeto = (id: number, voluntarioId: number): AxiosPromise<any> => {
  return api.post(`/projetos/${id}/voluntarios`, { 
    id_voluntario: voluntarioId, 
    iniciador: 'ong' 
  });
};

export const removerVoluntarioDoProjeto = (id: number, voluntarioId: number): AxiosPromise<any> => {
  return api.delete(`/projetos/${id}/voluntarios/${voluntarioId}`);
};

export const adicionarVoluntario = adicionarVoluntarioAoProjeto;
export const removerVoluntario = removerVoluntarioDoProjeto;
