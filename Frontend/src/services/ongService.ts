import serverService from './serverService';
import type { Ong, OngCadastro } from '../interfaces/ong';
import type { AxiosPromise } from 'axios';

const ongService = {
  cadastro: (dadosOng: OngCadastro): AxiosPromise<Ong> => {
    return serverService.post<Ong>('/ongs', dadosOng);
  },
};

export default ongService;