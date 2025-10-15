import serverService from './serverService';
import type { Voluntario, VoluntarioCadastro } from '../interfaces/voluntario';
import type { AxiosPromise } from 'axios';

const voluntarioService = {
  cadastro: (dadosVoluntario: VoluntarioCadastro): AxiosPromise<Voluntario> => {
    return serverService.post<Voluntario>('/voluntarios', dadosVoluntario);
  },
};

export default voluntarioService;