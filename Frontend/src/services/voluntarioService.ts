import api from './api';
import type { Voluntario, VoluntarioCadastro, VoluntarioLogin } from '../interfaces/voluntario';
import type { AxiosPromise } from 'axios';

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

};

export default voluntarioService;
