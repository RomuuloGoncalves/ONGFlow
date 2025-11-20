import serverService from './serverService';
import type { Projeto } from '../interfaces/projeto';
import type { AxiosPromise } from 'axios';

interface ProjetosResponse {
  data: Projeto[];
}

const projetoService = {
  getProjetosPorOng: (idOng: number): AxiosPromise<ProjetosResponse> => {
    return serverService.get<ProjetosResponse>(`/ongs/${idOng}/projetos`);
  },
};

export default projetoService;
