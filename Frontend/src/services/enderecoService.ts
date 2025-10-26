import api from './api';
import type { Endereco } from '../interfaces/endereco';
import type { ApiResponse } from '../interfaces/apiResponse';
import type { AxiosPromise } from 'axios';

const enderecoService = {
  getEnderecos: (): AxiosPromise<Endereco[]> => {
    return api.get<Endereco[]>('/enderecos');
  },

  getEndereco: (id: number): AxiosPromise<ApiResponse<Endereco>> => {
    return api.get<ApiResponse<Endereco>>(`/enderecos/${id}`);
  },

  createEndereco: (dados: Partial<Endereco>): AxiosPromise<ApiResponse<Endereco>> => {
    return api.post<ApiResponse<Endereco>>('/enderecos', dados);
  },

  updateEndereco: (id: number, dados: Partial<Endereco>): AxiosPromise<ApiResponse<Endereco>> => {
    return api.put<ApiResponse<Endereco>>(`/enderecos/${id}`, dados);
  },

  deleteEndereco: (id: number): AxiosPromise<ApiResponse<Endereco>> => {
    return api.delete<ApiResponse<Endereco>>(`/enderecos/${id}`);
  },
};

export default enderecoService;
