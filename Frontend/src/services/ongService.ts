import api from './api';
import type { Ong, OngLogin } from '../interfaces/ong';
import type { AxiosPromise } from 'axios';

interface LoginResponse {
  message: string;
  ong: Ong;
  access_token: string;
}

const ongService = {
  login: (dadosLogin: OngLogin): AxiosPromise<LoginResponse> => {
    return api.post<LoginResponse>('/ongs/login', dadosLogin);
  },
};

export default ongService;
