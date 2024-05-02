import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account, Client, Users } from 'node-appwrite';

import {
  APPWRITE_CLIENT_FACTORY,
  APPWRITE_SERVER,
} from '../common/configs/injection-token';
import { AppwriteFactoryFn } from './models/appwrite-factory';

@Injectable()
export class SsoService {
  constructor(
    @Inject(APPWRITE_CLIENT_FACTORY)
    private readonly appwriteClient: AppwriteFactoryFn,
    @Inject(APPWRITE_SERVER) private readonly appwriteServer: Client,
  ) {}

  getUserFromToken(token: string) {
    try {
      const auth = new Account(this.appwriteClient().setJWT(token));
      return auth.get();
    } catch (error) {
      throw new NotFoundException('SSO: User not found');
    }
  }

  async deleteCurrentSession(userId: string) {
    const sdk = new Users(this.appwriteServer);
    const { sessions } = await sdk.listSessions(userId);
    await sdk.deleteSession(userId, sessions[0].$id);
  }

  async listSession(userId: string) {
    const sdk = new Users(this.appwriteServer);
    const { sessions } = await sdk.listSessions(userId);
    console.log('🚀 ~ SsoService ~ listSession ~ sessions:', sessions);
  }
}
