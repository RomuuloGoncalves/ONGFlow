import api from './api';
import type { Ong, OngCadastro, OngLogin } from '../interfaces/ong';
import type { ApiResponse } from '../interfaces/apiResponse';
import type { AxiosPromise } from 'axios';
import type { Projeto } from '@/interfaces/projeto';

interface LoginResponse {
  message: string;
  ong: Ong;
  access_token: string;
}

const ongService = {
  cadastro: (dadosOng: OngCadastro): AxiosPromise<Ong> => {
    return api.post<Ong>('/ongs', dadosOng);
  },

  login: (dadosLogin: OngLogin): AxiosPromise<LoginResponse> => {
    return api.post<LoginResponse>('/ongs/login', dadosLogin);
  },

  getOng: (id: number): AxiosPromise<Ong> => {
    return api.get<Ong>(`/ongs/${id}`);
  },

  updateOng: (id: number, dados: Partial<Ong>): AxiosPromise<ApiResponse<Ong>> => {
    return api.put<ApiResponse<Ong>>(`/ongs/${id}`, dados);
  },

  deleteOng: (id: number): AxiosPromise<ApiResponse<null>> => {
    return api.delete<ApiResponse<null>>(`/ongs/${id}`);
  },

  getProjetos: (id: number): AxiosPromise<Projeto[]> => {
    return api.get<Projeto[]>(`/ongs/${id}/projetos`);
  },
};

export default ongService;
