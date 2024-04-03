import { setupGlobal } from '@idle/env/global';
import { Client } from 'appwrite';
import axios, { AxiosError } from 'axios';

setupGlobal();

const appwrite = new Client();
appwrite
  .setEndpoint(runtimeConfig.appwriteProjectHost)
  .setProject(runtimeConfig.appwriteProjectId);

const API_PREFIX = '/api';
export const axiosClient = axios.create({
  baseURL: API_PREFIX,
  withCredentials: false,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    const { response } = error;
    if (
      response?.status === 401 &&
      (response?.data as any).message === 'token_expired'
    ) {
      // refresh
      await axiosClient.get('auth/refresh');

      const retry = await axiosClient(originalRequest);
      return retry;
    }
    return Promise.reject(error);
  },
);

export class APICollection {
  constructor(
    readonly collectionPrefix: string,
    readonly client = axiosClient,
  ) {}

  getUrl(path: string) {
    return `${this.collectionPrefix}/${path}`;
  }
}
