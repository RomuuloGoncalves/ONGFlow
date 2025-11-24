import api from './api';
import type { AxiosPromise } from 'axios';
import type { ApiResponse } from '../interfaces/apiResponse';
import type { VoluntarioHabilidade, CreateVoluntarioHabilidade } from '@/interfaces/voluntarioHabilidade';

const voluntarioHabilidadeService = {
  getAll: (): AxiosPromise<VoluntarioHabilidade[]> => {
    return api.get<VoluntarioHabilidade[]>('/voluntariohabilidades');
  },

  getOne: (id: number): AxiosPromise<ApiResponse<VoluntarioHabilidade>> => {
    return api.get<ApiResponse<VoluntarioHabilidade>>(`/voluntariohabilidades/${id}`);
  },

  create: (dados: Partial<VoluntarioHabilidade>): AxiosPromise<ApiResponse<VoluntarioHabilidade>> => {
    return api.post<ApiResponse<VoluntarioHabilidade>>('/voluntariohabilidades', dados);
  },

  update: (id: number, dados: Partial<VoluntarioHabilidade>): AxiosPromise<ApiResponse<VoluntarioHabilidade>> => {
    return api.put<ApiResponse<VoluntarioHabilidade>>(`/voluntariohabilidades/${id}`, dados);
  },

  delete: (id: number): AxiosPromise<ApiResponse<VoluntarioHabilidade>> => {
    return api.delete<ApiResponse<VoluntarioHabilidade>>(`/voluntariohabilidades/${id}`);
  },

  getByVoluntario: (idVoluntario: number): AxiosPromise<ApiResponse<VoluntarioHabilidade[]>> => {
    return api.get<ApiResponse<VoluntarioHabilidade[]>>(`/voluntariohabilidades/voluntario/${idVoluntario}`);
  },
  storeMany: (dados: Partial<CreateVoluntarioHabilidade[]>): AxiosPromise<ApiResponse<VoluntarioHabilidade>> => {
    console.log("service dados", dados)
    return api.post<ApiResponse<VoluntarioHabilidade>>('/voluntariohabilidades/lote', dados);
  },
syncHabilidades: (id: number, habilidades: number[]) => {
  return api.post(`/voluntariohabilidades/sync/${id}`, { habilidades });
},

};

export default voluntarioHabilidadeService;
