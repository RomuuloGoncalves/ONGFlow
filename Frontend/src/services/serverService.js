import api from './api';

const serverService = {
    /**
     * Realiza uma requisição POST.
     * @param {string} path - O caminho do endpoint 
     * @param {object} data - O corpo da requisição.
     * @returns {Promise<any>} A resposta da API.
     */
    post: (path, data) => {
        return api.post(path, data);
    },

    /**
     * Realiza uma requisição GET.
     * @param {string} path - O caminho do endpoint
     * @returns {Promise<any>} A resposta da API.
     */
    get: (path) => {
        return api.get(path);
    },

    /**
     * Realiza uma requisição DELETE.
     * @param {string} path - O caminho do endpoint
     * @returns {Promise<any>} A resposta da API.
     */
    delete: (path) => {
        return api.delete(path);
    },

    /**
     * Realiza uma requisição PUT.
     * @param {string} path - O caminho do endpoint
     * @param {object} data - O corpo da requisição.
     * @returns {Promise<any>} A resposta da API.
     */
    put: (path, data) => {
        return api.put(path, data);
    },

    /**
     * Gera a URL completa para uma imagem.
     * @param {string} imageName - O nome do arquivo da imagem.
     * @returns {string} A URL completa da imagem.
     */
    getImageUrl: (imageName) => {
        // Acessa a baseURL configurada na instância do Axios e remove o '/api' do final
        const baseUrl = api.defaults.baseURL.replace('/api', '');
        return `${baseUrl}/uploads/${imageName}`;
    },
};

export default serverService;