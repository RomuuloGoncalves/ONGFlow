import serverService from './serverService';
import type { Ong, OngLogin, OngCadastro } from '../interfaces/ong';
import type { AxiosPromise } from 'axios';

interface LoginResponse {
  message: string;
  ong: Ong;
  access_token: string;
}

const ongService = {
  cadastro: (dadosOng: OngCadastro): AxiosPromise<Ong> => {
    return serverService.post<Ong>('/ongs', dadosOng);
  },

  login: (dadosLogin: OngLogin): AxiosPromise<LoginResponse> => {
    return serverService.post<LoginResponse>('/ongs/login', dadosLogin);
  },
};

export default ongService;
