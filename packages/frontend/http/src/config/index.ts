import { setupGlobal } from '@idle/env/global';
import { Client } from 'appwrite';
import axios, { AxiosError } from 'axios';

import authApis from '../apis/auth';

setupGlobal();

const appwrite = new Client();
appwrite
  .setEndpoint(runtimeConfig.appwriteProjectHost)
  .setProject(runtimeConfig.appwriteProjectId);

const API_PREFIX = '/api';
const axiosClient = axios.create({
  baseURL: API_PREFIX,
  withCredentials: false,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    const { response } = error;
    console.log(response);
    if (
      response?.status === 401 &&
      (response?.data as any).message === 'token_expired'
    ) {
      // refresh
      await authApis.refresh();

      try {
        const retry = await axiosClient(originalRequest);
        return retry;
      } catch (err) {
        console.log(err);
      }
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

export default axiosClient;
