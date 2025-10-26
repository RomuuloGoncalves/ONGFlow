import api from './api';
import type { Voluntario, VoluntarioCadastro, VoluntarioLogin } from '../interfaces/voluntario';
import type { ApiResponse } from '../interfaces/apiResponse';
import type { AxiosPromise } from 'axios';
import type { Projeto } from '@/interfaces/projeto';

interface LoginResponse {
  message: string;
  voluntario: Voluntario;
  access_token: string;
}

const voluntarioService = {
  cadastro: (dadosVoluntario: VoluntarioCadastro): AxiosPromise<Voluntario> => {
    return api.post<Voluntario>('/voluntarios', dadosVoluntario);
  },

  login: (dadosLogin: VoluntarioLogin): AxiosPromise<LoginResponse> => {
    return api.post<LoginResponse>('/voluntarios/login', dadosLogin);
  },

  getProjetos: (id: number): AxiosPromise<Projeto[]> => {
    return api.get<Projeto[]>(`/voluntarios/${id}/projetos`);
  },

  getVoluntario: (id: number): AxiosPromise<Voluntario> => {
    return api.get<Voluntario>(`/voluntarios/${id}`);
  },

  updateVoluntario: (id: number, dados: Partial<Voluntario>): AxiosPromise<ApiResponse<Voluntario>> => {
    return api.put<ApiResponse<Voluntario>>(`/voluntarios/${id}`, dados);
  },


};

export default voluntarioService;
