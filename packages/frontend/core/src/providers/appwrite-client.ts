import { Client } from 'appwrite';

const client = new Client();
client
  .setEndpoint(runtimeConfig.appwriteProjectHost)
  .setProject(runtimeConfig.appwriteProjectId);

export const AppWriteClient = client;

export type AppWriteErrorResponse = {
  code: number;
  message: string;
  type: string;
  version: string;
};
