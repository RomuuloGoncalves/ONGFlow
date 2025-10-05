import serverService from './serverService';
import Cookies from 'js-cookie';

const voluntarioService = {
    /**
     * Envia os dados para cadastrar um novo usuário.
     * @param {object} dadosUsuario - Objeto com nome, email, senha, etc.
     * @returns {Promise<any>} A promessa da requisição.
     */
    cadastro: (dadosUsuario) => {
        return serverService.post('/voluntarios', dadosUsuario);
    },

    /**
     * Envia as credenciais para autenticação.
     * @param {object} credenciais - Objeto com email e senha.
     * @returns {Promise<any>} A promessa da requisição.
     */
    login: (credenciais) => {
        return serverService.post('/auth/usuario/login', credenciais);
    },

    /**
     * Envia a requisição para invalidar o token no backend.
     * @returns {Promise<any>} A promessa da requisição.
     */
    logout: () => {
        // O token de autorização já é enviado automaticamente pelo interceptor do axios
        return serverService.post('/auth/usuario/logout', null);
    },

    /**
     * Busca os dados do usuário autenticado.
     * @returns {Promise<any>} A promessa da requisição com os dados do usuário.
     */
    getDadosUsuario: () => {
        // O interceptor do axios já vai adicionar o 'Authorization: Bearer <token>'
        return serverService.post('/auth/usuario/dadosUsuario', {});
    },

    /**
     * Remove o token de autenticação dos cookies do navegador.
     */
    limparToken: () => {
        Cookies.remove('token');
    }
};

export default voluntarioService;