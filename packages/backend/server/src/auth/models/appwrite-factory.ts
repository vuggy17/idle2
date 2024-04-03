import { Client } from 'node-appwrite';

import { AppwriteConfig } from '../../common/configs/config.interface';

export function appwriteClientFactory(config: AppwriteConfig) {
  const client = new Client();
  client.setEndpoint(config.host);
  client.setProject(config.projectId);
  client.setKey(config.apiKey);

  return client;
}

export type AppwriteFactoryFn = () => Client;
