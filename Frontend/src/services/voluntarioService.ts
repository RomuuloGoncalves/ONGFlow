import serverService from './serverService';
import Cookies from 'js-cookie';
import { Voluntario, VoluntarioCadastro, VoluntarioLogin } from '../types/voluntario';
import { AxiosPromise } from 'axios';

const voluntarioService = {
  /**
   * Envia os dados para cadastrar um novo usuário.
   * @param {VoluntarioCadastro} dadosUsuario - Objeto com nome, email, senha, etc.
   * @returns {AxiosPromise<any>} A promessa da requisição.
   */
  cadastro: (dadosUsuario: VoluntarioCadastro): AxiosPromise<any> => {
    return serverService.post('/voluntarios', dadosUsuario);
  },

  /**
   * Envia as credenciais para autenticação.
   * @param {VoluntarioLogin} credenciais - Objeto com email e senha.
   * @returns {AxiosPromise<any>} A promessa da requisição.
   */
  login: (credenciais: VoluntarioLogin): AxiosPromise<{ token: string }> => {
    return serverService.post('/auth/usuario/login', credenciais);
  },

  /**
   * Envia a requisição para invalidar o token no backend.
   * @returns {AxiosPromise<any>} A promessa da requisição.
   */
  logout: (): AxiosPromise<any> => {
    // O token de autorização já é enviado automaticamente pelo interceptor do axios
    return serverService.post('/auth/usuario/logout', null);
  },

  /**
   * Busca os dados do usuário autenticado.
   * @returns {AxiosPromise<Voluntario>} A promessa da requisição com os dados do usuário.
   */
  getDadosUsuario: (): AxiosPromise<Voluntario> => {
    // O interceptor do axios já vai adicionar o 'Authorization: Bearer <token>'
    return serverService.post('/auth/usuario/dadosUsuario', {});
  },

  /**
   * Remove o token de autenticação dos cookies do navegador.
   */
  limparToken: (): void => {
    Cookies.remove('token');
  }
};

export default voluntarioService;
