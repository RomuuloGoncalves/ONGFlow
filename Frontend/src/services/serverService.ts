import api from './api';
import type { AxiosPromise } from 'axios';

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
};

export default serverService;
