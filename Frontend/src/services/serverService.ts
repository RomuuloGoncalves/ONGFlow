import api from './api';
import { AxiosPromise } from 'axios';

const serverService = {
  /**
   * Realiza uma requisição POST.
   * @param {string} path - O caminho do endpoint 
   * @param {object} data - O corpo da requisição.
   * @returns {Promise<any>} A resposta da API.
   */
  post: <T>(path: string, data: unknown): AxiosPromise<T> => {
    return api.post(path, data);
  },

  /**
   * Realiza uma requisição GET.
   * @param {string} path - O caminho do endpoint
   * @returns {Promise<any>} A resposta da API.
   */
  get: <T>(path: string): AxiosPromise<T> => {
    return api.get(path);
  },

  /**
   * Realiza uma requisição DELETE.
   * @param {string} path - O caminho do endpoint
   * @returns {Promise<any>} A resposta da API.
   */
  delete: <T>(path: string): AxiosPromise<T> => {
    return api.delete(path);
  },

  /**
   * Realiza uma requisição PUT.
   * @param {string} path - O caminho do endpoint
   * @param {object} data - O corpo da requisição.
   * @returns {Promise<any>} A resposta da API.
   */
  put: <T>(path: string, data: unknown): AxiosPromise<T> => {
    return api.put(path, data);
  },

  /**
   * Gera a URL completa para uma imagem.
   * @param {string} imageName - O nome do arquivo da imagem.
   * @returns {string} A URL completa da imagem.
   */
  getImageUrl: (imageName: string): string => {
    // Acessa a baseURL configurada na instância do Axios e remove o '/api' do final
    const baseUrl = api.defaults.baseURL?.replace('/api', '') ?? '';
    return `${baseUrl}/uploads/${imageName}`;
  },
};

export default serverService;
