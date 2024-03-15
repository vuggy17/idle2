import type { RuntimeConfig } from './global';

export function getRuntimeConfig(): RuntimeConfig {
  const configs: RuntimeConfig = {
    appwriteProjectHost: process.env.APPWRITE_PROJECT_HOST,
    appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
    serverUrlPrefix: process.env.SERVER_URL_PREFIX,
  };

  if (process.env.NODE_ENV === 'development') {
    configs.serverUrlPrefix = 'http://localhost:8080';
  }

  return configs;
}
