import { setupGlobal } from '@idle/env/global';
import { Account, Client } from 'appwrite';
import axios, { AxiosError } from 'axios';

setupGlobal();

const appwrite = new Client();
appwrite
  .setEndpoint(runtimeConfig.appwriteProjectHost)
  .setProject(runtimeConfig.appwriteProjectId);
const accountProvider = new Account(appwrite);

const API_PREFIX = '/api';
const axiosClient = axios.create({
  baseURL: API_PREFIX,
  // withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const tokenOrNull = localStorage.getItem('jwt') ?? '';
  const userIdOrNull = localStorage.getItem('user_id') ?? '';
  if (tokenOrNull) {
    config.headers.setAuthorization(`Bearer ${JSON.parse(tokenOrNull)}`);
  }
  if (userIdOrNull) {
    config.headers.set('x-user-id', JSON.stringify(userIdOrNull));
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    const { response } = error;
    if (
      response?.status === 401 &&
      (response?.data as any).type === 'user_jwt_invalid'
    ) {
      // get new token
      const token = await accountProvider.createJWT();
      localStorage.setItem('jwt', JSON.stringify(token.jwt));
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

  createUrl(path: string) {
    return `${this.collectionPrefix}/${path}`;
  }
}

export default axiosClient;
