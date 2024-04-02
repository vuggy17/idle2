import { Account, ID } from 'appwrite';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  foo = 'this do nothing';

  async createAnonymousSession() {
    this.accountGateway.createAnonymousSession();
  }

  async getCurrentSession() {
    return this.accountGateway.getSession('current');
  }

  async requestJwt() {
    return this.accountGateway.createJWT();
  }

  async sendMagicUrl(email: string) {
    const PLATFORM_VERIFY_URL = `${window.location.origin}/auth/verify`;

    return this.accountGateway.createMagicURLSession(
      ID.unique(),
      email,
      PLATFORM_VERIFY_URL,
    );
  }

  /**
   * @INTERNAL Use verifyMagicEmailSession from use-auth.tsx instead
   */
  async verifyMagicEmailSession(userId: string, sessionSecret: string) {
    return this.accountGateway.updateMagicURLSession(userId, sessionSecret);
  }
}
export const authGateway = new AuthGateway(new Account(AppWriteClient));
