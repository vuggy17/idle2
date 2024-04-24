import { Account, ID } from 'appwrite';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  createAnonymousSession() {
    return this.accountGateway.createAnonymousSession();
  }

  getCurrentSession() {
    return this.accountGateway.getSession('current');
  }

  requestJwt() {
    return this.accountGateway.createJWT();
  }

  sendMagicUrl(email: string) {
    const PLATFORM_VERIFY_URL = `${window.location.origin}/auth/verify-email`;

    return this.accountGateway.createMagicURLSession(
      ID.unique(),
      email,
      PLATFORM_VERIFY_URL,
    );
  }

  createPassword(password: string) {
    return this.accountGateway.updatePassword(password);
  }

  logoutCurrentDevice() {
    return this.accountGateway.deleteSession('current');
  }

  /**
   * @INTERNAL Use loginByMagicEmail from auth-helper instead
   */
  verifyMagicEmailSession(userId: string, sessionSecret: string) {
    return this.accountGateway.updateMagicURLSession(userId, sessionSecret);
  }
}
export const authGateway = new AuthGateway(new Account(AppWriteClient));
